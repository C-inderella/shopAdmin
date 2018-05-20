import axios from 'axios'

export default {
  created () {
    // 页面加载时 请求 第一页的 数据
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      searchText: '',
      adddialogFormVisible: false,
      scope: {},
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
      },
      editDialogForm: false,
      editUserForm: false,
      editUserForm: {
        username: '',
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
      this.currentPage = page
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
    },
    handleChangeState (item) {
      axios({
        url: `http://localhost:8888/api/private/v1/users${item.id}/state/${item.mg_state}`,
        method: 'put',
        headers: {
          Authorization: window.localStorage.removeItem('token')
        }
      }).then(res => {
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: `${item.mg_state ? '启用' : '禁用'}成功`
          })
        }
      })
    },
    // 删除用户
    handleDeleteUser (item) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 用户点击 确定 执行这里
        axios({
          url: `http://localhost:8888/api/private/v1/users/${item.id}`,
          method: 'delete',
          headers: {
            Authorization: window.localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 更新当前页的列表数据
            this.loadUsersByPage(this.currentPage)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEditUser () {

    }
  }
}
