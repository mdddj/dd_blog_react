import React from "react";
import {useRequest} from "@@/plugin-request/request";
import {getBlogList} from "@/service/Blog";
import {Blog} from "@/model/BlogModel";
import BlogCardLayout from "@/components/BlogCardLayout";
import {Card, Container} from "@material-ui/core";

const IndexHomeBlogList: React.FC<{}> = (params) => {


  const {data, loading} = useRequest(() => getBlogList(1, 10))

  console.log(data)
  console.log(loading)

  if (loading) {
    return <>加载中</>
  }

  const blogList = data.list as Blog[]


  return <Container maxWidth={"md"}>
    <Card style={{marginTop: 30}}>
      {
        blogList.map(item => <BlogCardLayout key={item.id} blog={item}/>)
      }
    </Card>
  </Container>
}

export default IndexHomeBlogList
