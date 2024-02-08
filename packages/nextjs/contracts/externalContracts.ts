import { Abi } from "viem";
import { AlloABI } from "~~/abis/Allo";
import { MicroGrantsABI } from "~~/abis/Microgrants";
import { MicroGrantsGovABI } from "~~/abis/MicrograntsGov";
import { MicroGrantsHatsABI } from "~~/abis/MicrograntsHats";
import { RegistryABI } from "~~/abis/Registry";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  11155111: {
    ALLOPROXY: {
      address: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: AlloABI as Abi,
      external: true,
    },
    REGISTRY: {
      address: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: RegistryABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGY: {
      address: "",
      abi: MicroGrantsABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYGOV: {
      address: "",
      abi: MicroGrantsGovABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYHATS: {
      address: "",
      abi: MicroGrantsHatsABI as Abi,
      external: true,
    },
    // Add SuperFluid & others
  },
  // Arbitrum Sepolia
  421614: {
    ALLOPROXY: {
      address: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: AlloABI as Abi,
      external: true,
    },
    REGISTRY: {
      address: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: RegistryABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGY: {
      address: "",
      abi: MicroGrantsABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYGOV: {
      address: "",
      abi: MicroGrantsGovABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYHATS: {
      address: "",
      abi: MicroGrantsHatsABI as Abi,
      external: true,
    },
    // Add SuperFluid & others
  },
  5: {
    ALLOPROXY: {
      address: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: AlloABI as Abi,
      external: true,
    },
    REGISTRY: {
      address: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: RegistryABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGY: {
      address: "",
      abi: MicroGrantsABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYGOV: {
      address: "",
      abi: MicroGrantsGovABI as Abi,
      external: true,
    },
    MICROGRANTSSTRATEGYHATS: {
      address: "",
      abi: MicroGrantsHatsABI as Abi,
      external: true,
    },
    // Add SuperFluid & others
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
