import React from "react";
import {Banner} from "@/components/HomePageExtra";
import {BlogList} from "@/components/BlogList";
import './article.styl'
import HardwayLayout from "../../layout/hardway-layout"

const YuQue: React.FC = () => <HardwayLayout>
  <Banner />
  <BlogList />
</HardwayLayout>

export default YuQue
