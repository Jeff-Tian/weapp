import {ApolloProvider} from "@apollo/client";

import {useState} from "react";
import {handleClipboard} from "@/functions/clipboard";
import {tryRedirect} from "@/functions/redirect";

import "taro-ui/dist/style/index.scss";
import Taro, { usePageNotFound } from "@tarojs/taro";

import {AppContext, AppNameEnum} from "@/app-context";

import "./app.styl";
import {client} from "./apollo-client";

handleClipboard();

if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
  Taro.onPageNotFound(({isEntryPage, path}) => {
    console.log("path = ", isEntryPage, path);
  });

  Taro.onError((error) => {
    console.error("ah");
    console.error(error);
  });
}

const App = ({children}) => {
  const [appName, setAppName] = useState(AppNameEnum.hardway);

  usePageNotFound(({path}) => {
    console.log("on page not found", path);

    tryRedirect(path);
  })

  return (
    <AppContext.Provider value={{appName, setAppName}}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppContext.Provider>
  );
};

export default App;
