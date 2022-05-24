// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    constructor(uint _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    } 

    struct Item{
        uint itemID;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    mapping(uint => Item) public items;

    event offered(
        uint itemCount,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed brought
    );

    function addItem(IERC721 _nft, uint _tokenId,uint _price) external nonReentrant{ 
        require(_price > 0, "price should be greater than 0");

        itemCount++;
        _nft.transferFrom(msg.sender,address(this),_tokenId);

        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );

    }

    function purchaseItem(uint _itemId) external payable nonReentrant{
        uint _totalPrice = getPriceNFT(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount,"item doesn't exist");
        require(msg.value <= _totalPrice, "not enough ether to cover the price and fee");
        require(!item.sold, "item already sold");

        item.seller.transfer(_totalPrice);
        feeAccount.transfer(_totalPrice - item.price);

        item.sold = true;
        item.nft.transferFrom(address(this),msg.sender,_totalPrice);

        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getPriceNFT(uint _itemId) public view returns(uint){
        return (items[_itemId].price*(100 - feePercent)/100);
    }
    
}