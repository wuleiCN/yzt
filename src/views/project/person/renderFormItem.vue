<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '110px'
    },
    dataForm: {
      type: Object,
      default: () => {}
    },
    dataRule: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      initForm: {
        input: this.createInput,
        textarea: this.createTextarea,
        switch: this.createSwitch,
        timePicker: this.createTimePicker,
        rate: this.createRate,
        radio: this.createRadio,
        upload: this.createUpload,
        checkbox: this.createCheckbox,
        select: this.createSelect
      }
      // dataForm: {}
    }
  },
  methods: {
    createInput(options) {
      // change: options.change
      const prop = {
        attrs: { ...options.attrs },
        on: this.$listeners
      }
      return <el-input {...prop} v-model_trim={this.dataForm[options.name]}></el-input>
    },
    createRate(options) {
      return <el-rate v-model={this.dataForm[options.name]}></el-rate>
    },
    createTextarea(options) {
      const prop = {
        attrs: { ...options.attrs },
        on: this.$listeners
      }
      return <el-input type='textarea' {...prop} v-model_trim={this.dataForm[options.name]}></el-input>
    },
    createSwitch(options) {
      return <el-switch v-model={this.dataForm[options.name]}></el-switch>
    },
    createUpload(options) {
      return (
        <el-upload
          class='upload-demo'
          action='https://jsonplaceholder.typicode.com/posts/'
          on-preview={options.handlePreview}
          on-remove={options.handleRemove}
          before-remove={options.beforeRemove}
          multiple
          accept='.jpg, .jpeg, .png'
          limit={3}
          on-exceed={options.handleExceed}
          file-list={options.fileList}>
          <el-button size='small' type='primary'>点击上传</el-button>
          <div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      )
    },
    createTimePicker(options) {
      return (
        <el-time-select
          v-model={this.dataForm[options.name]}
          picker-options={
            {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          }
          placeholder='选择时间'>
        </el-time-select>
      )
    },
    createSelect(options) {
      const option = options.option.map(item => (
        <el-option label={item.label} value={item.value}></el-option>
      ))
      return <el-select v-model={this.dataForm[options.name]}>{option}</el-select>
    },
    createRadio(options) {
      const option = options.option.map(item => (
        <el-radio label={item.label} value={item.value}>
          {item.value}
        </el-radio>
      ))
      return (
        <el-radio-group v-model={this.dataForm[options.name]}>
          {option}
        </el-radio-group>
      )
    },
    createCheckbox(options) {
      const option = options.option.map(item => (
        <el-checkbox label={item.label} name='type'>{item.value}</el-checkbox>
      ))
      this.$set(this.dataForm, options.name, this.dataForm[options.name] || [])
      return (
        <el-checkbox-group v-model={this.dataForm[options.name]}>
          {option}
        </el-checkbox-group>
      )
    },
    // 包裹el-form-item
    addForItem(context, element) {
      var formItem = element.formItem
      return (
        <el-form-item label={formItem.label} rules={formItem.rules} prop={formItem.prop}>
          {context}
        </el-form-item>
      )
    },
    init() {
      const arr = []
      this.items.forEach(element => {
        var foritem = this.addForItem(this.initForm[element.type](element), element)
        arr.push(foritem)
      })
      return arr
    },
    returnForm() {
      return this.dataForm
    }
  },
  render() {
    return (
      <template>
        {this.init()}
      </template>
    )
  }
}
</script>
