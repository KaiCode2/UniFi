const Types = {
  //   EIP712Domain: [
  //     { name: "name", type: "string" },
  //     { name: "version", type: "string" },
  //     { name: "chainId", type: "uint256" },
  //     { name: "verifyingContract", type: "address" },
  //   ],
  BridgeCall: [
    { name: 'targets', type: 'address[]' },
    { name: 'data', type: 'bytes[]' },
    { name: 'nonce', type: 'uint256' },
  ],
};

const makeDomain = (
  chainId: number | bigint,
  verifyingContract: string,
  name = 'Omnaccount',
  version = '1'
) => ({
  //   name,
  //   version,
  chainId,
  verifyingContract,
});

const makeBridgeTypedMessage = (
  targets: string[],
  data: string[],
  nonce: number,
  chainId: number | bigint,
  verifyingContract: string
) => {
  return {
    domain: makeDomain(chainId, verifyingContract),
    types: Types,
    primaryType: 'BridgeCall',
    message: { targets, data, nonce },
  };
};

export { makeBridgeTypedMessage, makeDomain, Types };
