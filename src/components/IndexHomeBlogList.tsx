import React, {useState} from "react";
import {useRequest} from "@@/plugin-request/request";
import {getBlogList} from "@/service/Blog";
import {Blog} from "@/model/BlogModel";
import BlogCardLayout from "@/components/BlogCardLayout";
import {Card, Container} from "@material-ui/core";
import Pager from "@/components/Pager";
import {useMount} from "@umijs/hooks";
import {PagerModel} from "@/model/PagerModel";

const IndexHomeBlogList: React.FC = () => {

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pager, setPager] = useState<PagerModel>()
  const [page, setPage] = useState<number>(1)

  // 加载数据
  const fetchData = (page: number) => {
    return getBlogList(page, 4);
  }


  const {loading, run} = useRequest(fetchData, {
    manual: true,
    onSuccess: (result, param) => {
      console.log(result)
      setBlogs(result.list as Blog[])
      setPager(result.page as PagerModel)
    }
  })


  useMount(async () => {
    await run(page)
  })

  if (loading) {
    return <>加载中</>
  }


  return <Container maxWidth={"md"}>
    <Card style={{marginTop: 30, marginBottom: 30}}>
      {
        blogs.map(item => <BlogCardLayout key={item.id} blog={item}/>)
      }

      {
        pager && <div style={{textAlign: "center", padding: 12}}>
          <Pager model={pager} onChangePage={page => {
            run(page).then(r => {
            })
          }}/>
        </div>
      }
    </Card>
  </Container>
}

export default IndexHomeBlogList
