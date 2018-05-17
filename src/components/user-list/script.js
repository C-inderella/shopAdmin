import axios from 'axios'

export default {
  created () {
    axios.get('http://localhost:8888/api/private/v1/users', {
      headers: {
        Authorization: window.localStorage.getItem('token')
      },
      params: { // params 可以用来指定请求的查询字符串
        pagenum: 1,
        pagesize: 5
      }
    })
    .then(res => {
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data.users
      }
    })
  },
  data () {
    return {
      tableData: []
    }
  }
}
