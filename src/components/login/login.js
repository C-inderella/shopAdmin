export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) { // 如果是无效是校验
          return
        }
        this.$axios.post('/login', this.loginForm)
        .then(res => {
          console.log(res.data)
          const {data, meta} = res.data
          const {msg, status} = meta
          if (status === 200) {
            // 登录成功 -- 将凭证放到本地存储（然后会在路由守卫那里使用）
            window.localStorage.setItem('token', data.token)
            // console.log(data.token) // 校验成功会自动在 data 里面加上 token
            this.$router.push('/')
          } else if (status === 400) {
            // window.alert(msg)
            this.$message.error('密码错误')
          }
        })
      });
    }
  }
}
