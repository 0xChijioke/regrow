import getConfig from "next/config";
import { Allo, MicroGrantsStrategy, Registry } from "@allo-team/allo-v2-sdk";

export const allo = new Allo(getConfig());

export const registry = new Registry(getConfig());

export const strategyMG = new MicroGrantsStrategy(getConfig());
