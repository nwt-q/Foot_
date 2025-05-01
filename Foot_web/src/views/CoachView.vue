<template>
<div class="coach-dashboard">
    <el-container>
      <el-container>
        <el-header height="60px" class="dashboard-header">
          <h2>教练工作台</h2>
          <el-dropdown>
            <span class="coach-info">
              <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span>王教练</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <el-main>
          <div class="coach-center">
    <div class="coach-card">
      <h2 class="title">教练功能</h2>
      <div class="subtitle">球员管理与战术布置</div>
      <div class="divider"></div>
      <div class="btn-group">
        <button class="main-btn" @click="showPlayerModal = true">
          <i class="icon">👥</i> 管理球员信息
        </button>
        <button class="main-btn" @click="showTacticModal = true">
          <i class="icon">📝</i> 布置战术
        </button>
      </div>
    </div>

    <!-- 管理球员信息弹窗 -->
    <div v-if="showPlayerModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header player-header">
          <span>管理球员信息</span>
          <span class="close" @click="showPlayerModal = false">&times;</span>
        </div>
        <div class="modal-body">
          <div class="form-section">
            <h3>添加新球员</h3>
            <input v-model="newPlayer.name" placeholder="球员姓名" />
            <input v-model.number="newPlayer.age" type="number" min="0" placeholder="年龄" />
            <input v-model="newPlayer.position" placeholder="位置" />
            <button class="add-btn" @click="addPlayer">
              <i class="icon">➕</i> 添加球员
            </button>
          </div>
          <div class="list-section">
            <h3><i class="icon">👥</i> 球员列表</h3>
            <ul>
              <li v-for="p in players" :key="p.name">
                <span>{{ p.name }}</span>
                <span>{{ p.position }}</span>
                <span>{{ p.age }}岁</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 布置战术弹窗 -->
    <div v-if="showTacticModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header tactic-header">
          <span>布置战术</span>
          <span class="close" @click="showTacticModal = false">&times;</span>
        </div>
        <div class="modal-body">
          <div class="form-section">
            <label>阵型选择</label>
            <select v-model="selectedFormation">
              <option v-for="f in formations" :key="f" :value="f">{{ f }}</option>
            </select>
            <textarea v-model="tacticNote" rows="4" placeholder="填写战术说明..."></textarea>
            <button class="add-btn" @click="saveTactic">
              <i class="icon">💾</i> 保存战术
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
        </el-main>

      </el-container>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import {
  User,
  SetUp,
  Calendar
} from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const currentMenu = ref('1')
const currentDate = ref(new Date())
const selectedPlayer = ref('')
const dataAnalysisVisible = ref(false)
const trainingPlanVisible = ref(false)


const showPlayerModal = ref(false)
const showTacticModal = ref(false)

const players = ref([
  { name: '张三', age: 25, position: '前锋' },
  { name: '李四', age: 28, position: '中场' }
])
const newPlayer = ref({ name: '', age: 0, position: '' })

function addPlayer() {
  if (newPlayer.value.name && newPlayer.value.position && newPlayer.value.age > 0) {
    players.value.push({ ...newPlayer.value })
    newPlayer.value = { name: '', age: 0, position: '' }
  }
}

const formations = [
  '4-4-2（经典平衡）',
  '4-3-3（进攻型）',
  '3-5-2（防守反击）'
]
const selectedFormation = ref(formations[0])
const tacticNote = ref('')

function saveTactic() {
  alert(`已保存阵型：${selectedFormation.value}\n战术说明：${tacticNote.value}`)
  tacticNote.value = ''
  showTacticModal.value = false
}

// 统计数据
const statistics = ref({
  playerCount: 18,
  trainingHours: 120,
  matchCount: 15,
  averageScore: 8.5
})

// 球员数据
// const players = ref([
//   { id: 1, name: '张三', position: '前锋', status: '正常', fitness: 85 },
//   { id: 2, name: '李四', position: '中场', status: '受伤', fitness: 60 }
// ])

// 今日训练
const todayTrainings = ref([
  { id: 1, time: '09:00', content: '体能训练', status: '完成' },
  { id: 2, time: '10:30', content: '技术训练', status: '进行中' },
  { id: 3, time: '15:00', content: '战术训练', status: '未开始' }
])

// 球员分析数据
const playerAnalysis = ref([
  {
    name: '张三',
    attendance: '95%',
    improvement: 12,
    performance: '优秀',
    recommendation: '建议加强远射训练'
  },
  {
    name: '李四',
    attendance: '88%',
    improvement: -3,
    performance: '良好',
    recommendation: '需要提高体能'
  }
])

// 训练进度图表配置
const trainingProgressOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['完成率', '达标率']
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: {
    type: 'value',
    max: 100
  },
  series: [
    {
      name: '完成率',
      type: 'line',
      data: [95, 93, 98, 90, 95]
    },
    {
      name: '达标率',
      type: 'line',
      data: [85, 83, 88, 80, 85]
    }
  ]
})

// 球员能力分布图表配置
const playerAbilityOption = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '能力分布',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 35, name: '速度' },
        { value: 30, name: '力量' },
        { value: 25, name: '技术' },
        { value: 20, name: '意识' }
      ]
    }
  ]
})

// 球员能力雷达图配置
const playerRadarOption = ref({
  radar: {
    indicator: [
      { name: '速度', max: 100 },
      { name: '力量', max: 100 },
      { name: '技术', max: 100 },
      { name: '意识', max: 100 },
      { name: '体能', max: 100 }
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [80, 70, 90, 85, 75],
          name: '能力值'
        }
      ]
    }
  ]
})

// 训练效果趋势图配置
const trainingEffectOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['第一周', '第二周', '第三周', '第四周']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '训练效果',
      type: 'line',
      data: [75, 80, 85, 90],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      }
    }
  ]
})
</script>

<style scoped>
.coach-center {
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coach-card {
  background: #fafbfc;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 40px 48px 32px 48px;
  text-align: center;
  min-width: 400px;
}
.title {
  font-size: 2.2rem;
  font-weight: 600;
  color: #2c3e50;
}
.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 12px 0 18px 0;
}
.divider {
  height: 1px;
  background: #eaeaea;
  margin: 0 0 24px 0;
}
.btn-group {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.main-btn {
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(33,150,243,0.08);
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.main-btn:hover {
  background: #1976d2;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-dialog {
  background: #fff;
  border-radius: 10px;
  min-width: 480px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  overflow: hidden;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal-header {
  background: #2196f3;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.player-header { background: #2196f3; }
.tactic-header { background: #2196f3; }
.close {
  font-size: 1.6rem;
  cursor: pointer;
  font-weight: bold;
}
.modal-body {
  padding: 32px 28px 24px 28px;
}
.form-section {
  margin-bottom: 32px;
}
.form-section h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
}
.form-section input,
.form-section select,
.form-section textarea {
  width: 100%;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: #fafbfc;
  transition: border 0.2s;
}
.form-section input:focus,
.form-section select:focus,
.form-section textarea:focus {
  border-color: #2196f3;
  outline: none;
}
.add-btn {
  width: 100%;
  background: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #27ae60;
}
.list-section {
  background: #fafbfc;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(44,62,80,0.04);
}
.list-section h3 {
  font-size: 1rem;
  color: #5c5470;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.list-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.list-section li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ececec;
  font-size: 1rem;
  color: #333;
}
.list-section li:last-child {
  border-bottom: none;
}
.coach-dashboard {
  height: 100vh;
  background-color: #f0f2f5;
}

.side-menu {
  height: 100vh;
  background-color: #001529;
}

.dashboard-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.coach-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.coach-info span {
  margin-left: 8px;
}

.data-cards {
  margin-bottom: 20px;
}

.data-card {
  .card-header {
    display: flex;
    align-items: center;
    
    .el-icon {
      margin-right: 8px;
      font-size: 20px;
    }
  }

  .card-content {
    text-align: center;
    padding: 20px 0;

    .number {
      font-size: 24px;
      font-weight: bold;
      color: #409EFF;
    }

    .unit {
      margin-left: 4px;
      font-size: 14px;
      color: #909399;
    }
  }
}

.chart-card {
  margin-bottom: 20px;
  
  :deep(.echarts) {
    height: 300px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.training-tag {
  background-color: #409EFF;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 4px;
}

.training-list {
  height: calc(100% - 20px);
}

.positive {
  color: #67C23A;
}

.negative {
  color: #F56C6C;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .el-aside {
    width: 64px !important;
  }

  .el-menu {
    width: 64px;
  }

  .el-menu-item span {
    display: none;
  }

  .data-cards .el-col {
    width: 100%;
    margin-bottom: 10px;
  }

  .charts-container .el-col {
    width: 100%;
  }
}
.coach-dashboard {
  height: 100vh;
}

.side-menu {
  background-color: #304156;
  height: 100vh;
  border-right: none;
}

.el-menu {
  border-right: none;
  background-color: transparent;
}

.el-menu-item {
  color: #bfcbd9;
}

.el-menu-item:hover {
  color: #fff;
  background-color: #263445;
}

.el-menu-item.is-active {
  color: #409EFF;
  background-color: #263445;
}

.dashboard-header {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
}

.coach-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.coach-info span {
  margin-left: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tactic-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-actions button {
  padding: 0 5px;
}

.delete-btn {
  color: #f56c6c;
}

.tactic-content {
  font-size: 14px;
}

.tactic-description {
  margin-top: 10px;
  color: #666;
}
</style>