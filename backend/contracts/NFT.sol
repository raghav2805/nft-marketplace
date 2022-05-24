// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount = 0;

    constructor() ERC721("NFT DAPP","dapp"){}

    function mintNFT(string memory tokenURI) external returns(uint){
        tokenCount++;
        _safeMint(msg.sender,tokenCount);
        _setTokenURI(tokenCount,tokenURI);

        return(tokenCount);
    }
    
}