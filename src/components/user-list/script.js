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
      },
      // 添加用户列表-校验规则
      roules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码为 3 - 16 位长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
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
    },
    handleAddUser () {
      // 请求用户数据
      axios({
        method:"post",
        url:'http://localhost:8888/api/private/v1/users',
        data: this.addUserForm,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        // 如果响应数据的 status === 200； 说明响应成功
        // 清空列表
        // 关闭对话框
        // console.log(res)
        const {data, meta} = res.data
        const {status} = meta
        if (status === 201) {
          // 响应成功 -- 关闭对话框 -- 清空列表
          this.$refs['form'].resetFields()
          // console.log(this.$refs['form'])
          this.dialogFormVisible = false
        }
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
