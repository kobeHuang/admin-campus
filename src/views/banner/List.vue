<template>
    <div>
        <!-- 顶部工具条 -->
        <div class="tools-bar">
            <div class="button-list">
                <el-select placeholder="请选择显示位置">
                    <el-option label="首页" value="1"></el-option>
                    <el-option label="师生作品" value="2"></el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="请输入关键字"></el-input>
                <el-button size="small" class="search-btn" @click.native="onSeach">搜索</el-button>
                <el-button size="small" type="danger" class="add-btn" @click="onAdd">新增</el-button>
            </div>
        </div>
        
    </div>
</template>
