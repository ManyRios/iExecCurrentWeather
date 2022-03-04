// SPDX-License-Identifier: Apache-2.0

/******************************************************************************
 * Copyright 2021 IEXEC BLOCKCHAIN TECH                                       *
 *                                                                            *
 * Licensed under the Apache License, Version 2.0 (the "License");            *
 * you may not use this file except in compliance with the License.           *
 * You may obtain a copy of the License at                                    *
 *                                                                            *
 *     http://www.apache.org/licenses/LICENSE-2.0                             *
 *                                                                            *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 ******************************************************************************/

pragma solidity ^0.8.0;

import "./Oracle.sol";
import "hardhat/console.sol";

contract GetWeathers{
    string public weather;
    uint256 public date;

    function getOracleDataBeijing() public  returns (string memory){
        bytes32 oracleId = 0xa9eafaaaf319cc6df3ce87aaec7ef0be319d7221fd8006577262be1d0f7ff527;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataBerlin() public  returns (string memory){
        bytes32 oracleId = 0x56ea7a0c80ff93913d450d66b75857ca90dfef029ff5be69e4cf3bc675a38042;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataMadrid() public  returns (string memory){
        bytes32 oracleId = 0x138c1ee4524544b83c0651574e31c9c9b55c803eb30f90fc8fc519b7c9c8b3dc;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataMoscow() public  returns (string memory){
        bytes32 oracleId = 0xee7e4ea7ad7b7d311c7463575dc642b4d132e2882b451e57a1db470c783b7a53;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataLondon() public  returns (string memory){
        bytes32 oracleId = 0x56a67522a8bfdcd51d3dfb2e532ac839af3667f2d8f7d3f677fd94642b6017a2;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataParis() public  returns (string memory){
        bytes32 oracleId = 0xdfa697eac60de63812b80c6057ec51f1f1cc91085e8f69ceebe50b75da10d8e3;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataRome() public  returns (string memory){
        bytes32 oracleId = 0x4c3a92e5000f10d84f065fac7f6fa0eeb63b7b5b400eda655fb7709336aa836f;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }
    function getOracleDataTokyo() public  returns (string memory){
        bytes32 oracleId = 0x32b0ea2e8df526a81115244166704f01e1c12801a5eca5c76dfde391f3bf583e;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }

    function getOracleDataWashington() public  returns (string memory){
        bytes32 oracleId = 0x6ba25529ec3075cd03b872dc22543fa8f5d2d539a2c976b12f8364a3316fdfae;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F; //generic contract Oracle
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 _date) = oracleContract.getString(oracleId);
        weather = value;
        date = _date;
        return value;
    }

  

    function getWeather() public view returns (string memory) {
        return weather;
    }

}