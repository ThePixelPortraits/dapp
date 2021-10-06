const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("The Pixel Portraits Commissions", function () {
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    const ThePixelPortraits = await ethers.getContractFactory("ThePixelPortraits");
    
    let owner, addrs;
    [owner, ...addrs] = await ethers.getSigners();
  
    portraitsContract = await ThePixelPortraits.deploy(owner.address, 
                                                        ethers.utils.parseEther("0.1"));
  });
  
  describe("ThePixelPortraits", function () {
    it("Should deploy YourContract", async function () {
      const ThePixelPortraits = await ethers.getContractFactory("ThePixelPortraits");
      
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
    
      portraitsContract = await ThePixelPortraits.deploy(signer0.address, 
                                                          ethers.utils.parseEther("0.1"));
      let minBid = await portraitsContract.minBid();
      
      expect(minBid).to.equal(ethers.utils.parseEther("0.1"));
    });
    
    it("Should be able to register some existing names", async function () {

      await portraitsContract.registerNames(["Thom", "Mark", "Jamie"]);
      
      let markIndex = await portraitsContract.names("mark");
      let thomIndex = await portraitsContract.names("thom");
      let jamieIndex = await portraitsContract.names("thom");


      expect(markIndex._hex).to.equal("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      expect(thomIndex._hex).to.equal("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      expect(jamieIndex._hex).to.equal("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

    });
    
    it("Should not be able to register any names twice", async function () {
      await expect(portraitsContract.registerNames(["Thom", "Mark", "Jamie", "Thom"])).to.be.revertedWith("name not available"); // can't do two of the same in the same txn
      await portraitsContract.registerNames(["Thom", "Mark", "Jamie"]);
      await expect(portraitsContract.registerNames(["Thom"])).to.be.revertedWith("name not available"); // can't do two of the same in different txns
    });
    
    it("Should not be able to register any names if not an admin", async function () {
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      await expect(portraitsContract.connect(signer2).registerNames(["alice"])).to.be.revertedWith("not an admin"); // not an admin
    });
    
    it("Should be able to commission a new piece to the back of the line", async function () {
      await portraitsContract.commission("Thom", {value: ethers.utils.parseEther("0.1")});
      
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      let newCommission = await portraitsContract.commissions(1); // should be in the 1 position to begin with
      expect(newCommission.name).to.equal("Thom");
      expect(newCommission.recipient).to.equal(signer0.address);
      expect(newCommission.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission.status).to.equal(0);
    });
    
    it("Should be not be able to create invalid commissions", async function () {
      await portraitsContract.registerNames(["Thom", "Mark", "Jamie"]);
      await expect(portraitsContract.commission("Thom", {value: ethers.utils.parseEther("0.1")})).to.be.revertedWith("name not available"); // no duplicate names
      await expect(portraitsContract.commission("alice%", {value: ethers.utils.parseEther("0.1")})).to.be.revertedWith("name not valid"); // no invalid names
      await expect(portraitsContract.commission("alice", {value: ethers.utils.parseEther("0.05")})).to.be.revertedWith("bid below minimum"); // no invalid names

    });
    
    it("Should be able to commission multiple pieces each to the back of the line", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});

      let newCommission0 = await portraitsContract.commissions(1); // should be in the 1 position to begin with
      expect(newCommission0.name).to.equal("Thom");
      expect(newCommission0.recipient).to.equal(signer0.address);
      expect(newCommission0.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission0.status).to.equal(0);

      // second commission
      await portraitsContract.connect(signer1).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      
      let newCommission1 = await portraitsContract.commissions(2); // should be in the 2 position to begin with
      expect(newCommission1.name).to.equal("Mark");
      expect(newCommission1.recipient).to.equal(signer1.address);
      expect(newCommission1.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission1.status).to.equal(0);
      
      // third commission
      await portraitsContract.connect(signer2).commission("Jamie", {value: ethers.utils.parseEther("0.1")});

      let newCommission2 = await portraitsContract.commissions(3); // should be in the 3 position to begin with
      expect(newCommission2.name).to.equal("Jamie");
      expect(newCommission2.recipient).to.equal(signer2.address);
      expect(newCommission2.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission2.status).to.equal(0);
      
    });
    it("Should be able to commission the same name multiple times as long as it isn't finished", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});

      let newCommission0 = await portraitsContract.commissions(1); // should be in the 1 position to begin with
      expect(newCommission0.name).to.equal("Thom");
      expect(newCommission0.recipient).to.equal(signer0.address);
      expect(newCommission0.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission0.status).to.equal(0);
      
      // second commission
      await portraitsContract.connect(signer1).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      
      let newCommission1 = await portraitsContract.commissions(2); // should be in the 2 position to begin with
      expect(newCommission1.name).to.equal("Thom");
      expect(newCommission1.recipient).to.equal(signer1.address);
      expect(newCommission1.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission1.status).to.equal(0);
    });
    it("Should be able to commission the same name multiple times and go ahead of an existing bid on the same name", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});

      let newCommission0 = await portraitsContract.commissions(1); // should be in the 1 position to begin with
      expect(newCommission0.name).to.equal("Thom");
      expect(newCommission0.recipient).to.equal(signer0.address);
      expect(newCommission0.bid).to.equal(ethers.utils.parseEther("0.1"));
      expect(newCommission0.status).to.equal(0);
      
      // second commission
      await portraitsContract.connect(signer1).commission("Thom", {value: ethers.utils.parseEther("0.15")});
      
      let newCommission1 = await portraitsContract.commissions(2); // should be in the 2 position to begin with
      expect(newCommission1.name).to.equal("Thom");
      expect(newCommission1.recipient).to.equal(signer1.address);
      expect(newCommission1.bid).to.equal(ethers.utils.parseEther("0.15"));
      expect(newCommission1.status).to.equal(0);
    });
    
    it("Should be able to do a complex series of insertions into the queue", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")}); // 1 - added to empty queue
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.18")}); // 2 - added in front of queue
      await portraitsContract.connect(signer0).commission("Jamie", {value: ethers.utils.parseEther("0.1")}); // 3 - added in back of queue
      await portraitsContract.connect(signer0).commission("Ryan", {value: ethers.utils.parseEther("0.14")}); // 4 - added in 2nd place
      await portraitsContract.connect(signer0).commission("Alex", {value: ethers.utils.parseEther("0.19")}); // 5 - added in the front

      // order should now be Alex, Mark, Ryan, Thom, Jamie
      
      let newCommission1 = await portraitsContract.commissions(1);
      let newCommission2 = await portraitsContract.commissions(2); 
      let newCommission3 = await portraitsContract.commissions(3); 
      let newCommission4 = await portraitsContract.commissions(4); 
      let newCommission5 = await portraitsContract.commissions(5); 
    });
    
    it("Should be able to update the name on a commission if it is taken", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await portraitsContract.connect(signer0).updateCommissionName(3, "mark2");
      
      let commission3 = await portraitsContract.commissions(3);
      
      expect(commission3.name).to.equal("mark2");
    });
    
    it("Should not be able to update the name on a commission I didn't create", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer2).updateCommissionName(3, "mark2")).to.be.revertedWith("commission not yours");
    });
    
    it("Should not be able to update the name on a commission that is invalid", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).updateCommissionName(5, "mark2")).to.be.revertedWith("commission not valid");
    });
    
    it("Should not be able to update the name on a commission which is not in the queue", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).updateCommissionName(2, "Jamie")).to.be.revertedWith("commission not in queue");
    });
    
    it("Should not be able to update the name on a commission with a name that is taken", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).updateCommissionName(3, "thom")).to.be.revertedWith("name not available");
    });
    
    it("Should not be able to update the name on a commission with a name that is isn't valid", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).updateCommissionName(3, "thom%")).to.be.revertedWith("name not valid");
    });
    it("Should be able to rescind a commission if it is taken", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await portraitsContract.connect(signer0).rescindCommission(3);
      
      let commission3 = await portraitsContract.commissions(3);
      
      expect(commission3.status).to.equal(2);
    });
    
    it("Should not be able to rescind a commission I didn't create", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer2).rescindCommission(3)).to.be.revertedWith("commission not yours");
    });
    
    it("Should not be able to rescind a commission that is invalid", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).rescindCommission(5)).to.be.revertedWith("commission not valid");
    });
    
    it("Should be able to rescind a commission even if the original name is not taken", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark2", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await portraitsContract.connect(signer0).rescindCommission(3)
    });
    
    it("Should not be able to rescind a commission which is not in the queue", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).processCommissions([1,2]);

      // update the name on commission 3
      await expect(portraitsContract.connect(signer0).rescindCommission(2)).to.be.revertedWith("commission not in queue");
    });
    
    it("Should be able to push a commission ahead of others", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.13")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await portraitsContract.connect(signer0).increaseCommissionBid(3, {value: ethers.utils.parseEther("0.01")});

      let commission1 = await portraitsContract.commissions(1);
      let commission2 = await portraitsContract.commissions(2);
      let commission3 = await portraitsContract.commissions(3);
  
      await expect(commission3.bid).to.equal(ethers.utils.parseEther("0.11"));

    });
    
    it("Should not be able to push an invalid commission ahead of another one", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.13")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await expect(portraitsContract.connect(signer0).increaseCommissionBid(5, {value: ethers.utils.parseEther("0.01")})).to.be.revertedWith("commission not valid");
    });
    
    it("Should not be able to push a commission ahead which is not theirs", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      // first commission
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.13")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.1")});

      await expect(portraitsContract.connect(signer2).increaseCommissionBid(3, {value: ethers.utils.parseEther("0.01")})).to.be.revertedWith("commission not yours");
    });
    
    it("Should be able to process commissions at any point in the queue", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.12")});
      await portraitsContract.connect(signer0).commission("Mark", {value: ethers.utils.parseEther("0.11")});
      await portraitsContract.connect(signer0).commission("Jamie", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Alice", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Bob", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Emma", {value: ethers.utils.parseEther("0.1")});

      // The commissions are queued in the order they arrived in
    
      let balance = await ethers.provider.getBalance(portraitsContract.address);
      
      expect(balance).to.equal(ethers.utils.parseEther("0.63"));
      
      await portraitsContract.connect(signer0).processCommissions([2,4]);
      
      balance = await ethers.provider.getBalance(portraitsContract.address);
      
      expect(balance).to.equal(ethers.utils.parseEther("0.42"));
      
      await portraitsContract.connect(signer0).processCommissions([1]);
      
      balance = await ethers.provider.getBalance(portraitsContract.address);

      expect(balance).to.equal(ethers.utils.parseEther("0.3"));

      await portraitsContract.connect(signer0).increaseCommissionBid(6, {value: ethers.utils.parseEther("0.25")});
      
      await portraitsContract.connect(signer0).processCommissions([5,3,6]);
      
      balance = await ethers.provider.getBalance(portraitsContract.address);

      expect(balance).to.equal(ethers.utils.parseEther("0"));
      
    });
    
    it("Should be able to process commissions at any point in the queue", async function () {
      // Get the signers; accounts 0 through 2
      let signer0, signer1, signer2, signers;
      [signer0, signer1, signer2, signers] = await ethers.getSigners();
      
      await portraitsContract.connect(signer0).commission("Thom", {value: ethers.utils.parseEther("0.12")});
      await portraitsContract.connect(signer2).commission("Mark", {value: ethers.utils.parseEther("0.11")});
      await portraitsContract.connect(signer0).commission("Jamie", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Alice", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Bob", {value: ethers.utils.parseEther("0.1")});
      await portraitsContract.connect(signer0).commission("Emma", {value: ethers.utils.parseEther("0.1")});

      // The commissions are queued in the order they arrived in
      
      let balance = await ethers.provider.getBalance(portraitsContract.address);
      
      expect(balance).to.equal(ethers.utils.parseEther("0.63"));
            
      await portraitsContract.connect(signer0).processCommissions([2,4]);
    });
  });
});
