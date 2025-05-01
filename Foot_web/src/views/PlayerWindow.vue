<template>
  <div class="player-window">
    <div class="header">
      <h1>球员信息</h1>
      <p class="subtitle">个人数据与训练计划</p>
    </div>
    
    <div class="action-panel">
      <button class="primary-btn" @click="showPlayerInfo">
        <i class="icon">👤</i>
        <span>查看个人信息</span>
      </button>
      <button class="primary-btn" @click="showTrainingPlan">
        <i class="icon">📋</i>
        <span>查看训练计划</span>
      </button>
    </div>
    
    <div v-if="playerInfoVisible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>个人信息</h2>
          <span class="close" @click="closeModal">&times;</span>
        </div>
        
        <div class="info-container">
          <div class="player-profile">
            <div class="profile-avatar">{{ playerInfo.name.charAt(0) }}</div>
            <div class="profile-name">{{ playerInfo.name }}</div>
            <div class="profile-position">{{ playerInfo.position }}</div>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">年龄</div>
              <div class="info-value">{{ playerInfo.age }}岁</div>
            </div>
            <div class="info-item">
              <div class="info-label">体能状况</div>
              <div class="info-value">{{ playerInfo.fitness }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">射门成功率</div>
              <div class="info-value">{{ playerInfo.shootingAccuracy }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">传球成功率</div>
              <div class="info-value">{{ playerInfo.passingAccuracy }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">所属俱乐部</div>
              <div class="info-value">{{ playerInfo.club }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="trainingPlanVisible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>训练计划</h2>
          <span class="close" @click="closeModal">&times;</span>
        </div>
        
        <div class="info-container">
          <div class="training-schedule">
            <div v-for="(plan, index) in formattedTrainingPlan" :key="index" class="training-day">
              <div class="day-label">{{ plan.day }}</div>
              <div class="day-content">{{ plan.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const playerInfo = ref({
  name: '张三',
  age: 25,
  position: '前锋',
  fitness: '良好',
  shootingAccuracy: '75%',
  passingAccuracy: '85%',
  club: '北京国安'
})

const trainingPlan = ref('周一: 体能训练\n周二: 技术训练\n周三: 战术训练\n周四: 比赛分析\n周五: 恢复训练')

// 格式化训练计划为数组对象
const formattedTrainingPlan = computed(() => {
  return trainingPlan.value.split('\n').map(plan => {
    const [day, content] = plan.split(': ')
    return { day, content }
  })
})

const playerInfoVisible = ref(false)
const trainingPlanVisible = ref(false)

function showPlayerInfo() {
  playerInfoVisible.value = true
}

function showTrainingPlan() {
  trainingPlanVisible.value = true
}

function closeModal() {
  playerInfoVisible.value = false
  trainingPlanVisible.value = false
}
</script>

<style scoped>
/* 基础样式 */
.player-window {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 页面标题样式 */
.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-top: 0;
}

/* 按钮面板 */
.action-panel {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
}

/* 按钮样式 */
.primary-btn {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.primary-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(52, 152, 219, 0.3);
}

.primary-btn .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* 模态框样式 */
.modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideIn 0.3s ease;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #3498db;
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
}

.close:hover {
  color: #f1c40f;
}

/* 信息容器 */
.info-container {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

/* 球员资料卡片 */
.player-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.profile-position {
  font-size: 1.1rem;
  color: #7f8c8d;
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.info-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.info-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

/* 训练计划样式 */
.training-schedule {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.training-day {
  display: flex;
  background-color: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.training-day:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.day-label {
  background-color: #3498db;
  color: white;
  padding: 1rem;
  font-weight: bold;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-content {
  padding: 1rem;
  flex: 1;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .player-window {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
  
  .action-panel {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 5% auto;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .training-day {
    flex-direction: column;
  }
  
  .day-label {
    width: 100%;
    padding: 0.5rem;
  }
}
</style>