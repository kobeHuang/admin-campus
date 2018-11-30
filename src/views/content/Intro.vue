<template>
    <div class="form-wrap">
        <el-form v-loading="loading" :model="editForm" label-width="100px">
            <el-form-item label="标题">
                <el-input v-model="editForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <my-editor :content="editForm.content" @changeContent="changeContent"></my-editor>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="onEditSubmit">保 存</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>
<script>
import { Editor } from "../../components";
import { 
    axiosIntro, 
    axiosIntroSave
} from '../../api';

export default {
    data() {
        return {
            loading: false,
            editForm: {
                _id: '',
                title: '',
                content: ''
            }
        }
    },
    components: {
        "my-editor": Editor
    },
    methods: {
        getIntro() {
            axiosIntro()
            .then(data => {
                this.$loadingBar.finish();
                for (let key in this.editForm) {
                    this.editForm[key] = data[key];
                }
            })
            .catch(e => {
                this.$loadingBar.error();
            })
        },
        changeContent(data) {
            this.editForm.content = data;
        },
        onEditSubmit() {
            this.loading = true;
            axiosIntroSave(this.editForm)
            .then(data => {
                this.loading = false;
            })
            .catch(e => {
                this.loading = false;
            })
        }
    },
    mounted() {
        this.$loadingBar.start();
        this.getIntro();
    }
}
</script>

<style lang='scss' scoped>
.form-wrap {
  width: 80%;
  min-width: 500px;
}
</style>

