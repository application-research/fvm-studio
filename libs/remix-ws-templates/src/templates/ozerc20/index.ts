import { erc20 } from '@openzeppelin/wizard';

export default async (opts) => {
    if (opts) {
        erc20.defaults.mintable = opts.mintable
        erc20.defaults.burnable = opts.burnable
        erc20.defaults.pausable = opts.pausable
    }

    const filesObj = {
        'contracts/MyToken.sol': erc20.print({ ...erc20.defaults, upgradeable: opts && opts.upgradeable ? opts.upgradeable : false }),
        // @ts-ignore
        'scripts/deploy_with_ethers.ts': (await import('!!raw-loader!./scripts/deploy_with_ethers.ts')).default,
        // @ts-ignore
        'scripts/deploy_with_web3.ts': (await import('!!raw-loader!./scripts/deploy_with_web3.ts')).default,
        // @ts-ignore
        'scripts/ethers-lib.ts': (await import('!!raw-loader!./scripts/ethers-lib.ts')).default,
        // @ts-ignore
        'scripts/web3-lib.ts': (await import('!!raw-loader!./scripts/web3-lib.ts')).default,
        // @ts-ignore
        '.prettierrc.json': (await import('raw-loader!./.prettierrc')).default
    }

    // If no options is selected, opts.upgradeable will be undefined
    // We do not show test file for upgradeable contract
    // @ts-ignore
    if (!opts || opts.upgradeable === undefined || !opts.upgradeable) filesObj['tests/MyToken_test.sol'] = (await import('raw-loader!./tests/MyToken_test.sol')).default
    return filesObj
}