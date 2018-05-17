import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      /*rules: {
        username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
      }*/
    }
  },
  methods: {
    handleLogin () {
      axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          console.log(res.data)
          const {data, meta} = res.data
          const {msg, status} = meta
          if (status === 200) {
            // window.alert("登录成功")
            this.$router.push('/')
          } else if (status === 400) {
            window.alert(msg)
          }
        })
    }
  }
}
