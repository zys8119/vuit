<!--登录-->
<template>
    <div id="login" class="login-page" :style="loginPageStyle">
        <!--登录表单-->
        <div class="main-content" :style="mainStyle">
            <div class="scan-login-btn" @click="openScan"></div>
            <div class="main-inner-content">
                <ul class="header-tab">
                    <li @click="isAccount = true" :class="isAccount ? 'active' : ''" data-type="account-login">账号登录</li>
                    <li @click="isAccount = false" :class="!isAccount ? 'active' : ''" data-type="phone-login">短信登录</li>
                </ul>
                <ul v-if="isAccount" class="account-login input-container">
                    <li>
                        <img :src="indexImg.account_icon" alt="" />
                        <input id="account-input" v-model="form.account" type="text" placeholder="请输入账号" />
                    </li>
                    <li>
                        <img :src="indexImg.lock_icon" alt="" />
                        <input id="password-input" v-model="form.password" type="password" placeholder="请输入密码" />
                        <p id="forget-password" @click="forgetPasswordBtn">忘记密码？</p>
                    </li>
                </ul>
                <ul v-else class="phone-login input-container">
                    <li>
                        <img class="special" :src="indexImg.phone_icon" alt="" />
                        <input class="pinput" v-model="form.phone" id="phone-input" type="tel" placeholder="请输入手机号码" maxlength="11" />
                    </li>
                    <li>
                        <img :src="indexImg.lock_icon" alt="" />
                        <input id="code-input"  v-model="form.code" type="text" placeholder="请输入验证码" maxlength="6" />
                        <button id="get-code" :disabled="disabled" v-text="htm" @click="getCode"></button>
                    </li>
                </ul>
                <div id="login-btn" class="login-btn" @click="goLogin">
                    登录
                </div>
            </div>
            <div class="left-bottom">
                <ul>
                    <li>
                        <img :src="indexImg.qrcode_android" alt="" />
                        <p>扫一扫,安卓手机版</p>
                    </li>
                    <li>
                        <img :src="indexImg.qrcode_ios" alt="" />
                        <p>扫一扫,苹果手机版</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="footer-content">
            <div class="left">
                <p>宁波市人大常委会办公厅主办</p>
                <p>浙ICP备15005116号-1</p>
            </div>
            <div class="right">
                <img :src="indexImg.bottom_icon" alt="" />
            </div>
        </footer>
        <!--忘记密码-->
        <el-dialog
                title="忘记密码"
                :visible.sync="dialogVisibleOne"
                width="60%">
            <div class="forget-content" v-if="dialogVisibleOne">
                <!-- 第一步 -->
                <div class="first-step" v-if="forgetForm.step === 1">
                    <img class="step" :src="indexImg.step_1" alt="" />
                    <ul>
                        <li>
                            <div class="left-label">
                                <span class="red-tiny">*</span>
                                <span>手机号码：</span>
                            </div>
                            <input v-model="forgetForm.phone" id="sms-code-input" placeholder="请输入手机号码" type="text" />
                            <div id="sms-code-btn" class="sms-code-btn" :class="forgetForm.disabled ? 'sms-code-btn-else' : ''" @click="getCodePassword" v-text="forgetForm.htm"></div>
                        </li>
                        <li>
                            <div class="left-label">
                                <span class="red-tiny">*</span>
                                <span>手机验证码：</span>
                            </div>
                            <input v-model="forgetForm.code" id="sms-code-code" placeholder="请输入验证码" type="text" />
                        </li>
                        <li>
                            <div id="fisrt-cofirm-btn" @click="goNext" class="confirm-btn">确定</div>
                        </li>
                    </ul>
                </div>
                <!-- 第二步 -->
                <div  class="second-step" v-if="forgetForm.step === 2">
                    <img class="step" :src="indexImg.step_2" alt="" />
                    <ul>
                        <li>
                            <div class="left-label">
                                <span class="red-tiny">*</span>
                                <span>新密码：</span>
                            </div>
                            <input v-model="forgetForm.password" id="password" placeholder="请输入新密码" type="password" />
                            <p class="label-font">新密码必须包含数字，小写字母，长度不低于6位</p>
                        </li>
                        <li>
                            <div class="left-label">
                                <span class="red-tiny">*</span>
                                <span>确认密码：</span>
                            </div>
                            <input v-model="forgetForm.rePassword" id="repassword" placeholder="请再次输入密码" type="password" />
                        </li>
                        <li>
                            <div id="second-confirm-btn" @click="goNext" class="confirm-btn">确定</div>
                        </li>
                    </ul>
                </div>
                <!-- 第三步 -->
                <div class="third-step" v-if="forgetForm.step === 3">
                    <img class="step" :src="indexImg.step_3" alt="" />
                    <ul class="last-step">
                        <li>
                            <img :src="indexImg.check_finish" alt="" />
                            <span>新密码设置成功，请重新登录</span>
                        </li>
                    </ul>
                </div>
            </div>
        </el-dialog>
        <!--扫码登录-->
        <el-dialog
                title="扫码登录"
                :visible.sync="dialogVisibleTwo"
                width="60%">
            <div class="scan-login-content">
                <p class="scan-login-text">使用履职APP扫描二维码可直接登录</p>
                <div class="scan-login-img">
                    <div id="qrcode"></div>
                    <div class="scan-refresh" id="refresh" @click="openScan">
                        <img :src="indexImg.refresh" alt="">
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: "login",
    data() {
        return {
            dialogVisibleOne: false,
            dialogVisibleTwo: false,
            loginPageStyle: {
                background: 'url(./images/login/login_bg.png) no-repeat',
                backgroundSize: '100% 100%'
            },
            mainStyle: {
                background: 'url(./images/login/content_bg.png) no-repeat',
                backgroundSize: '100% 100%'
            },
            indexImg: {
                account_icon: './images/login/account_icon.png',
                lock_icon: './images/login/lock_icon.png',
                phone_icon: './images/login/phone_icon.png',
                qrcode_android: './images/login/qrcode_android.png',
                qrcode_ios: './images/login/qrcode_ios.png',
                bottom_icon: './images/login/bottom_icon.png',
                step_1: './images/login/step_1.png',
                step_2: './images/login/step_2.png',
                step_3: './images/login/step_3.png',
                check_finish: './images/login/check_finish.png',
                refresh: './images/login/icon-scan-refresh.png',
            },
            isAccount: true,
            form: {
                account: '',
                phone: '',
                password: '',
                code: ''
            },
            disabled: false,
            htm: '获取验证码',
            forgetForm: {
                step: 1,
                disabled: false,
                htm: '获取验证码',
                phone: '',
                code: '',
                password: '',
                rePassword: ''
            }
        }
    },
    mounted() {
        sessionStorage.clear();
        let self = this
        document.onkeydown = function(event) {
            var e = event || window.event
            if (e && e.keyCode === 13) {
                self.goLogin()
            }
        }
    },
    methods: {
        // 登录
        goLogin() {
            let self = this
            if (this.isAccount) {
                if (!self.form.account) { self.$message.error('请输入账号'); return }
                if (!self.form.password) { self.$message.error('请输入密码'); return }
                this.api.v1.auth.login({
                    account: self.form.account,
                    password: self.form.password,
                    source: 1,
                    way: 1
                }).then(res => {
                    sessionStorage.menu = JSON.stringify(res.data.menu)
                    sessionStorage.userInfo = JSON.stringify(res.data.user_info)
                    sessionStorage.roles = JSON.stringify(res.data.roles)
                    sessionStorage.unit = res.data.unit
                    self.$router.push('/')
                }).catch(() => {})
            } else {
                if (!self.form.phone) { self.$message.error('请输入手机号'); return }
                if (!this.$utils.checkPhoneNumber(self.form.phone)) { return }
                if (!self.form.code) { self.$message.error('请输入验证码'); return }
                this.api.v1.auth.login({
                    mobile_phone: self.form.phone,
                    code: self.form.code,
                    source: 1,
                    way: 3
                }).then(res => {
                    sessionStorage.menu = JSON.stringify(res.data.menu)
                    sessionStorage.userInfo = JSON.stringify(res.data.user_info)
                    sessionStorage.roles = JSON.stringify(res.data.roles)
                    sessionStorage.unit = res.data.unit
                    self.$router.push('/')
                }).catch(() => {})
            }
        },
        // 获取验证码
        getCode() {
            let self = this
            let num = 60
            if (this.disabled) return
            if (!self.form.phone) { self.$message.error('请输入手机号'); return }
            if (!this.$utils.checkPhoneNumber(self.form.phone)) { return }
            this.api.v1.auth.getCode({
                type: 1,
                mobile_phone: self.form.phone
            }).then(() => {
                self.disabled = true
                let _time = setInterval(function() {
                    self.htm = '重新发送(' + num + 's)'
                    if (num === 0) {
                        self.htm = '获取验证码'
                        self.disabled = false
                        clearInterval(_time)
                    } else num--
                }, 1000)
            }).catch(() => {})
        },
        // 忘记密码
        forgetPasswordBtn() {
            this.forgetForm.step = 1
            this.forgetForm.phone = ''
            this.forgetForm.code = ''
            this.forgetForm.password = ''
            this.forgetForm.rePassword = ''
            this.forgetForm.disabled = false
            this.forgetForm.htm = '获取验证码'
            this.dialogVisibleOne = true
        },
        // 忘记密码 获取验证码
        getCodePassword() {
            let self = this
            let num = 60
            if (this.forgetForm.disabled) return
            if (!self.forgetForm.phone) { self.$message.error('请输入手机号'); return }
            if (!this.$utils.checkPhoneNumber(self.forgetForm.phone)) { return }
            this.api.v1.auth.getCode({
                type: 2,
                mobile_phone: self.forgetForm.phone
            },'.forget-content').then(() => {
                self.forgetForm.disabled = true
                let _time = setInterval(function() {
                    self.forgetForm.htm = '重新发送(' + num + 's)'
                    if (num === 0) {
                        self.forgetForm.htm = '获取验证码'
                        self.forgetForm.disabled = false
                        clearInterval(_time)
                    } else num--
                }, 1000)
            }).catch(() => {})
        },
        // 忘记密码 下一步
        goNext() {
            let self = this
            if (this.forgetForm.step === 1) {
                if (!self.forgetForm.phone) { self.$message.error('请输入手机号'); return }
                if (!this.$utils.checkPhoneNumber(self.forgetForm.phone)) { return }
                if (!self.forgetForm.code) { self.$message.error('请输入验证码'); return }
                self.forgetForm.step++
            } else if (this.forgetForm.step === 2) {
                if (!self.forgetForm.password) { self.$message.error('请输入密码'); return }
                if (!self.forgetForm.rePassword) { self.$message.error('请再次输入密码'); return }
                if (self.forgetForm.password !== self.forgetForm.rePassword) { self.$message.error('两次密码输入不一致'); return }
                this.api.v1.auth.resetPwd({
                    mobile_phone: self.forgetForm.phone,
                    code: self.forgetForm.code,
                    new_pwd: self.forgetForm.password
                }).then(() => {
                    self.forgetForm.step++
                }).catch(() => {})
            }
        },
        // 扫码登录 打开 需 线上调试
        openScan() {
            let self = this
            this.dialogVisibleTwo = true
            this.api.v1.auth.generateLoginCode( {
                mobile_phone: self.forgetForm.phone,
                code: self.forgetForm.code,
                new_pwd: self.forgetForm.password
            }).then(res => {
                this.$utils.qrcodeLoginWS(res.data.token, res.data.code)
            }).catch(() => {})
        }
    }
}
</script>

<style scoped>

</style>
