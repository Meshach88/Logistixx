// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Logistix {
    address Owner;
    address payable seller;

    struct Shipment {
        bool isIdgen; // confirms if  txn Id is generated
        uint productid;
        string productname;
        string shipmentstatus;
        uint productstatus; //ordered=1, in-transit=2, delivered=3, canceled order=4
        address client; // gets the address of the client
        uint timeoforder; //registers the time of order
        address movement1;
        uint movement1time;
        address movement2;
        uint movement2time;
        address movement3;
        uint movement3time;
    }

    event PlacedOrder(uint productid, string productname, address client);
    event confirmedDelivery(
        uint productid,
        string productname,
        address client,
        address txnId
    );

    mapping(address => Shipment) public MapOrder;
    mapping(address => bool) public movements;

    constructor() public {
        Owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(Owner == msg.sender);
        _;
    }

    function ControlMovers(
        address _moversAddress
    ) public onlyOwner returns (string memory) {
        if (!movements[_moversAddress]) {
            movements[_moversAddress] = true;
        } else {
            movements[_moversAddress] = false;
        }

        return "Mover update successful";
    }

    function initiateOrder(
        uint _productid,
        string memory _productname,
        address _client
    ) public returns (address) {
        address txnId = msg.sender;

        MapOrder[txnId].isIdgen = true;
        MapOrder[txnId].productid = _productid;
        MapOrder[txnId].productname = _productname;
        MapOrder[txnId].shipmentstatus = "Processing order";
        MapOrder[txnId].productstatus = 1;
        MapOrder[txnId].client = msg.sender;
        MapOrder[txnId].timeoforder = now;

        emit PlacedOrder(_productid, _productname, _client);

        return txnId;
    }

    function cancelOrder(address _txnId) public returns (string memory) {
        require(MapOrder[_txnId].isIdgen);
        require(MapOrder[_txnId].client == msg.sender);

        MapOrder[_txnId].productstatus = 4;
        MapOrder[_txnId].shipmentstatus = "Order Cancelled";

        return "Your order has been cancelled";
    }

    function Carrier1Report(
        address _txnId,
        string memory _shipmentstatus
    ) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus == 1);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement1 = msg.sender;
        MapOrder[_txnId].movement1time = now;
        MapOrder[_txnId].productstatus = 2;
    }

    function Carrier2Report(
        address _txnId,
        string memory _shipmentstatus
    ) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus == 2);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement2 = msg.sender;
        MapOrder[_txnId].movement2time = now;
    }

    function Carrier3Report(
        address _txnId,
        string memory _shipmentstatus
    ) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus == 2);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement1 = msg.sender;
        MapOrder[_txnId].movement1time = now;
        MapOrder[_txnId].productstatus = 4;
    }

    function confirmReceipt(
        // uint _productid,
        // string memory _productname,
        // address _client,
        address _txnId
    ) public payable returns (string memory) {
        require(MapOrder[_txnId].client == msg.sender);
        // require(MapOrder[_txnId].productstatus == 4);
        seller.transfer(msg.value);

        // emit confirmedDelivery(_productid, _productname, _client, _txnId);
    }
}

// pragma solidity ^0.8.9;

// // Uncomment this line to use console.log
// // import "hardhat/console.sol";

// contract Lock {
//     uint public unlockTime;
//     address payable public owner;

//     event Withdrawal(uint amount, uint when);

//     constructor(uint _unlockTime) payable {
//         require(
//             block.timestamp < _unlockTime,
//             "Unlock time should be in the future"
//         );

//         unlockTime = _unlockTime;
//         owner = payable(msg.sender);
//     }

//     function withdraw() public {
//         // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//         // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//         require(block.timestamp >= unlockTime, "You can't withdraw yet");
//         require(msg.sender == owner, "You aren't the owner");

//         emit Withdrawal(address(this).balance, block.timestamp);

//         owner.transfer(address(this).balance);
//     }
// }
