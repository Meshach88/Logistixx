// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Logistixx {
    
    address payable Owner;
    address payable Seller;

    struct Shipment{
        bool isIdgen;  // confirms if  txn Id is generated
        uint productid;
        string productname;
        string shipmentstatus;
        uint productstatus; //ordered=1, in-transit=2, delivered=3, canceled order=4
        address client;     // gets the address of the client
        uint timeoforder;   //registers the time of order

        address movement1;
        uint movement1time;
        address movement2;
        uint movement2time;
        address movement3;
        uint movement3time;
    }

    mapping (address => Shipment) public MapOrder;
    mapping (address => bool) public movements;

    constructor() public {
        Owner = msg.sender;
    }

    modifier onlyOwner(){
        require(Owner == msg.sender);
        _;
    }

    function ControlMovers(address _moversAddress) onlyOwner public returns (string memory){

        if(!movements[_moversAddress]){
            movements[_moversAddress] = true;
        } else {
            movements[_moversAddress] = false;
        }

        return "Mover update successful";

    }

    function initiateOrder (uint _productid, string memory _productname) public returns (address){
        address txnId = msg.sender;

        MapOrder[txnId].isIdgen = true;
        MapOrder[txnId].productid = _productid;
        MapOrder[txnId].productname = _productname;
        MapOrder[txnId].shipmentstatus = "Processing order";
        MapOrder[txnId].productstatus = 1;
        MapOrder[txnId].client = msg.sender;
        MapOrder[txnId].timeoforder = now;

        return txnId;
    }

    function cancelOrder(address _txnId) public returns (string memory) {
        require(MapOrder[_txnId].isIdgen);
        require(MapOrder[_txnId].client == msg.sender);

        MapOrder[_txnId].productstatus = 4;
        MapOrder[_txnId].shipmentstatus = "Order Cancelled";

        return "Your order has been cancelled";
    }

    function Carrier1Report(address _txnId, string memory _shipmentstatus) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus==1);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement1 = msg.sender;
        MapOrder[_txnId].movement1time = now;
        MapOrder[_txnId].productstatus = 2;
    }

    function Carrier2Report(address _txnId, string memory _shipmentstatus) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus==2);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement2 = msg.sender;
        MapOrder[_txnId].movement2time = now;
    }

    function Carrier3Report(address _txnId, string memory _shipmentstatus) public {
        require(MapOrder[_txnId].isIdgen);
        require(movements[msg.sender]);
        require(MapOrder[_txnId].productstatus==2);

        MapOrder[_txnId].shipmentstatus = _shipmentstatus;
        MapOrder[_txnId].movement1 = msg.sender;
        MapOrder[_txnId].movement1time = now;
        MapOrder[_txnId].productstatus = 4;
    }

    function confirmDelivery(address _txnId) public payable returns (string memory) {
        require(MapOrder[_txnId].client == msg.sender);
        require(MapOrder[_txnId].productstatus==4);
        Owner.transfer(msg.value);

        


    }
}
