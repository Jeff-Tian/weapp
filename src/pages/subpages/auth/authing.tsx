import SinglePageLayout from "@/layout/single-page-layout";
import {LoginStatus} from "@/components/LoginStatus";
import {useContext} from "react";
import {AppContext, AppNameEnum} from "@/app-context";
import SimpleLayout from "@/layout/simple-layout";

const Authing = () => {
  const {appName} = useContext(AppContext);

  const Layout = appName === AppNameEnum.brickverse ? SimpleLayout : SinglePageLayout;

  return <Layout><LoginStatus /></Layout>
}

export default Authing
