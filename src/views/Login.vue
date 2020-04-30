<template>
  <div id="login">
    <div class="login">
      <div class="logo_img">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        pass: 666666
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入管理员用户名",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      userData: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let username = this.ruleForm.username;
          let password = this.$md5([this.ruleForm.pass]);
          this.$http
            .post("/pc/login", {
              username: username,
              password: password
            })
            .then(res => {
              this.userData = res.data;
              if (typeof res.data === "string") {
                this.$message.error(res.data);
              } else {
                this.$cookies.set("username", this.userData.username);
                this.$cookies.set("token", this.userData.token);
                this.$cookies.set("root", this.userData.root);
                if (this.userData.code === 1) {
                  this.$router.push("/home");
                  this.$message({
                    message: "登陆成功",
                    type: "success"
                  });
                }
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    const token = this.$cookies.get("token");
    if (token) {
      this.$message({
        message: "登陆成功",
        type: "success"
      });
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  #login {
    height: 100%;
    background-color: #2b4b6b;
    .login {
      border-radius: 5px;
      width: 450px;
      height: 320px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      .logo_img {
        background-color: #fff;
        width: 144px;
        height: 144px;
        padding: 10px;
        border-radius: 50%;
        border: 1px solid #eee;
        box-shadow: 0 0 10px #222;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -40%);
        img {
          border-radius: 50%;
        }
      }
      .demo-ruleForm {
        width: 400px;
        position: absolute;
        bottom: 0;
        padding: 10px 25px;
        .el-form-item__content {
          text-align: center;
          .el-button {
            margin: 0 40px;
            width: 120px;
          }
        }
      }
    }
  }
}
</style>
