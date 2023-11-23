import React from "react";

export enum AppNameEnum {
  hardway = 'hardway',
  brickverse = 'brickverse',
}

const defaultValue: { appName: AppNameEnum,
  setAppName: (appName: AppNameEnum) => void } = {} as any;

export const AppContext = React.createContext(defaultValue);
