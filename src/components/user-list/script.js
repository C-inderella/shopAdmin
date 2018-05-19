import axios from 'axios'

export default {
  created () {
    // 页面加载时 请求 第一页的 数据
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      total: 0,
      searchText: '',
      dialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleCurrentChange (page) {
      // page 是当前页码
      // console.log(page)
      // ----------------
      // 页码改变时 需要请求数据 -- 把请求封装起来
      this.loadUsersByPage(page)
    },
    loadUsersByPage (page) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: {
          Authorization: window.localStorage.getItem('token')
        },
        params: { // params 可以用来指定请求的查询字符串
          pagenum: page,
          pagesize: 3,
          query: this.searchText
        }
      })
      .then(res => {
        // console.log(res)
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    handleSearch () {
      this.loadUsersByPage(1)
    }
  }
}
