<template>
    <div>
        <template v-for="item in permissionList">
            <el-submenu v-if="item.children.length!==0" :index="item.meta.title">
                <template slot="title">{{item.meta.title}}</template>
                <template v-for="kid in item.children">
                    <el-menu-item  v-if="kid.children.length === 0" :key="kid.meta.title" :index="kid.meta.title">{{kid.meta.title}}</el-menu-item>
                    <sub-menu v-else :permissionList="kid.children" ></sub-menu>
                </template>
            </el-submenu>
            <el-menu-item v-else :index="item.meta.title">{{item.meta.title}}</el-menu-item>
        </template>
    </div>
</template>

<script>
  export default {
    props:['permissionList'],
    name: "subMenu"
  }
</script>

<style scoped>

</style>
