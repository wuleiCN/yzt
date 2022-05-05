
export default [
  {
    type: 'input',
    name: 'empPhon',
    attrs: { readonly: false, clearable: true },
    on: { change: (val) => {
      // console.log(val, 'cccccccccccc')
    } },
    formItem: {
      label: 'input',
      prop: 'empPhon',
      rules: [
        { required: true, message: '手机号码不能为空', trigger: 'blur' },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号码格式不正确',
          trigger: ['blur', 'change']
        }
      ] }
  },
  {
    type: 'textarea',
    name: 'textarea',
    formItem: {
      label: '备注',
      prop: 'textarea',
      rules: [
        { required: true, message: '备注不能为空', trigger: 'blur' }
      ] }
  },
  {
    type: 'select',
    name: 'xxx',
    option: [
      { label: '11', value: '11' },
      { label: '22', value: '22' }
    ],
    formItem: {
      label: 'select',
      prop: 'xxx'
    }
  },
  {
    type: 'radio',
    name: 'salaryType',
    option: [
      { label: 1, value: '工时1' },
      { label: 2, value: '工量1' }
    ],
    // change: handleChangeRedio,
    formItem: {
      label: '薪资计算',
      prop: 'salaryType',
      rules: { required: true, message: '请选择薪资计算方式', trigger: 'blur' }
    }
  },
  // {
  //   type: 'upload',
  //   options: {
  //     name: 'upload',
  //     handlePreview: handlePreview,
  //     handleRemove: handleRemove,
  //     beforeRemove: beforeRemove,
  //     handleExceed: handleExceed,
  //     fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
  //     formItem: {
  //       label: '图片上传',
  //       prop: 'upload',
  //       rules: { required: true, message: '请选择图片', trigger: 'blur' }
  //     }
  //   }
  // },
  {
    type: 'checkbox',
    name: 'ccc',
    option: [
      { label: '1', value: '选项一' },
      { label: '2', value: '选项二' },
      { label: '3', value: '选项三' },
      { label: '4', value: '选项四' }
    ],
    formItem: {
      label: '复选框',
      prop: 'ccc'
    }
  },
  {
    type: 'switch',
    name: 'switch',
    formItem: {
      label: '开关',
      prop: 'switch'
    }
  },
  {
    type: 'rate',
    name: 'rate',
    formItem: {
      label: '评分',
      prop: 'rate'
    }
  },
  {
    type: 'timePicker',
    name: 'timePicker',
    formItem: {
      label: '时间选择器',
      prop: 'timePicker'
    }
  }
]
