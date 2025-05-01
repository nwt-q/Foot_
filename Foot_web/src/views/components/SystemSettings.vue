<template>
  <div class="system-settings">
    <el-card class="settings-card">
      <el-form :model="settings" label-width="120px" class="settings-form">
        <el-form-item label="系统名称">
          <el-input 
            v-model="settings.systemName"
            placeholder="请输入系统名称"
            class="custom-input"
          />
        </el-form-item>
        
        <el-form-item label="备份频率">
          <el-select 
            v-model="settings.backupFrequency"
            placeholder="请选择备份频率"
            class="custom-select"
          >
            <el-option label="每天" value="daily" />
            <el-option label="每周" value="weekly" />
            <el-option label="每月" value="monthly" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="系统通知">
          <el-switch
            v-model="settings.notifications"
            active-text="开启"
            inactive-text="关闭"
            class="custom-switch"
          />
        </el-form-item>
        
        <el-form-item label="数据保留时间">
          <div class="retention-wrapper">
            <el-input-number
              v-model="settings.dataRetention"
              :min="1"
              :max="36"
              controls-position="right"
              class="custom-number"
            />
            <span class="unit">个月</span>
          </div>
        </el-form-item>
        
        <el-form-item class="form-footer">
          <el-button type="primary" @click="saveSettings" class="save-btn">
            保存设置
          </el-button>
          <el-button @click="resetSettings" class="reset-btn">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  systemName: '足球俱乐部管理系统',
  backupFrequency: 'daily',
  notifications: true,
  dataRetention: 12
})

const defaultSettings = {
  systemName: '足球俱乐部管理系统',
  backupFrequency: 'daily',
  notifications: true,
  dataRetention: 12
}

const saveSettings = () => {
  console.log('保存设置:', settings.value)
}

const resetSettings = () => {
  settings.value = { ...defaultSettings }
}
</script>

<style scoped>
.system-settings {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.settings-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.settings-form {
  padding: 20px;
}

.custom-input,
.custom-select {
  width: 100%;
  max-width: 400px;
}

.custom-switch {
  margin-left: 20px;
}

.retention-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-number {
  width: 120px;
}

.unit {
  color: #606266;
  font-size: 14px;
}

.form-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.save-btn {
  margin-right: 16px;
  padding: 12px 24px;
}

.reset-btn {
  padding: 12px 24px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6;
}

:deep(.el-input__wrapper:hover),
:deep(.el-select__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff;
}
</style>