<template>
  <b-navbar toggleable="lg" class="top_nav">
    <b-navbar-brand href="#">
      <svg t="1658668822931" class="icon admin_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3060" data-darkreader-inline-fill="" width="3rem" height="3rem" :fill="color"><path d="M349.866667 512l162.133333 256 162.133333-256h8.533334c93.866667 0 170.666667 76.8 170.666666 170.666667v170.666666c0 46.933333-38.4 85.333333-85.333333 85.333334H256c-46.933333 0-85.333333-38.4-85.333333-85.333334v-170.666666c0-93.866667 76.8-170.666667 170.666666-170.666667h8.533334z m183.466666 0l21.333334 42.666667-42.666667 128-42.666667-128 21.333334-42.666667h42.666666zM512 85.333333c93.866667 0 170.666667 76.8 170.666667 170.666667s-76.8 170.666667-170.666667 170.666667-170.666667-76.8-170.666667-170.666667 76.8-170.666667 170.666667-170.666667z" p-id="3061"></path></svg>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>切换主题</em>
          </template>
          <b-dropdown-item @click="changeThemeDark">🌙</b-dropdown-item>
          <b-dropdown-item @click="changeThemeLight">☀</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      color: '#fff'
    }
  },
  methods: {
    changeThemeDark () {
      const html = document.querySelector('html')
      this.color = '#fff'
      html.setAttribute('data-theme', 'dark')
    },
    changeThemeLight () {
      const html = document.querySelector('html')
      this.color = '#333'
      html.setAttribute('data-theme', 'light')
    }
  }
  // watch: {
  //   color () {
  //     const html = document.querySelector('html').getAttribute('data-theme')
  //     if (html === 'dark') this.color = '#fff'
  //     if (html === 'light') this.color = '#333'
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_handle.scss';
.top_nav {
  @include bk_color("background_color1");
  * {
    @include f_color("font_color1")
  }
  // background-color: #fff;
  .admin_icon {
    height: 100%;
  }
}
</style>
