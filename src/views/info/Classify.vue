<template>
    <div>
        <!-- 顶部工具条 -->
        <div class="tools-bar">
            <div class="button-list">
                <el-button size="small" type="danger" class="add-btn" @click.native="handleAdd" >新增</el-button>
            </div>
        </div>
        <!-- table表格 -->
        <div class="table-wrap">
            <el-table :data="tableData" style="margin-top: 10px; border: 1px solid #ebeef5;">
                <el-table-column prop="name" label="标题" width="300">
                </el-table-column>
                <el-table-column label="图标" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" alt="" style="width: 56px;">
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="是否可见" width="100">
                    <template slot-scope="scope">
                        <el-switch 
                            v-model="scope.row.status" 
                            active-color="#26B99A" 
                            inactive-color="#DCDFE6"
                            @change="handleSwitch(scope.row)" 
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <div class="button-list">
                            <el-button  @click="onEdit(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增/编辑 -->
    </div>
</template>
<script>
export default {
    methods: {
        handleAdd() {

        },
        handleSwitch(row) {

        }
    },
    mounted() {
        this.$loadingBar.start();
        this.$store.dispatch('GET_INFOCLASSIFY_TABLELIST',(bol) => {
            if(bol){
                this.$loadingBar.finish();
            }else{
                this.$loadingBar.error();
            }
        });
    }
}
</script>

