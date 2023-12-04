import React, {useContext} from "react";
import {Banner} from "@/components/HomePageExtra";
import {BlogList} from "@/components/BlogList";
import {AppContext, AppNameEnum} from "@/app-context";
import './article.styl'
import HardwayLayout from "../../layout/hardway-layout"

const YuQue: React.FC = () => {
  const {setAppName} = useContext(AppContext);

  setAppName(AppNameEnum.hardway);
  return <HardwayLayout>
    <Banner />
    <BlogList />
  </HardwayLayout>;
}

export default YuQue
