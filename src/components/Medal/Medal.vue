<template>
  <div class="medal-container">
    <el-tooltip placement="top">
      <div slot="content">
        {{ medal.description }}<br />
        Criada dia {{ medal.creationDate | moment('DD/MM/YYYY') }}
      </div>
      <div
        class="d-flex justify-center"
        :class="{
          sm: !size || size === 'sm',
          lg: size === 'lg'
        }"
      >
        <div
          class="medal-container__body"
          :style="`${medalBackgroundColor}${getBorderColorStyle}`"
        >
          <div v-if="size === 'lg'" class="medal-title">
            <span
              v-for="(char, index) in splittedMedalName"
              :key="index"
              :style="
                `transform: rotate(${anglePerChar * index - angleOffset}deg)`
              "
            >
              {{ char }}
            </span>
          </div>
          <el-avatar
            class="inside-circle-line"
            :style="getBorderColorStyle"
            :src="medal.picture"
          >
            <i class="el-icon-trophy fallback" :style="getIconStrokeColor" />
          </el-avatar>
        </div>
        <svg
          :style="getFillColorStyle"
          xmlns="http://www.w3.org/2000/svg"
          class="medal-container__award"
          viewBox="0 0 120.525 163.773"
        >
          <g transform="translate(-684 -370)">
            <path
              :style="setFillColor(colorsSet.leftRibbon)"
              d="M706.436,470.831,689.81,512.194l23.419-4.359,12.977,20.479L744.555,483,733.2,478.637l-11.152,3.143-6.083-10.949Z"
            />
          </g>
          <g transform="translate(0 96.413)">
            <g transform="translate(0)">
              <path
                d="M123.208,283.823a4.232,4.232,0,0,0-5.512,2.315l-14.581,35.683-7.784-12.693a4.22,4.22,0,0,0-4.5-1.921l-15.843,3.449,15.046-36.823a4.228,4.228,0,0,0-7.828-3.2L64.118,314.9a4.227,4.227,0,0,0,4.812,5.729l20.763-4.52,10.575,17.245a4.227,4.227,0,0,0,3.6,2.018q.171,0,.342-.013a4.224,4.224,0,0,0,3.571-2.614l17.738-43.406A4.226,4.226,0,0,0,123.208,283.823Z"
                transform="translate(-63.804 -268.007)"
              />
            </g>
          </g>
          <g transform="translate(-684 -370)">
            <path
              :style="setFillColor(colorsSet.rightRibbon)"
              d="M748.255,485.987l16.018,40.146,12.977-18.248,22,4.258L781,467.029l-6.691,9.935-15-1.014Z"
            />
          </g>
          <g transform="translate(59.063 91.597)">
            <g>
              <path
                d="M287.355,309.719,268.12,262.644a4.228,4.228,0,1,0-7.828,3.2l16.195,39.637-15.843-3.449a4.229,4.229,0,0,0-4.5,1.921l-7.784,12.693-14.007-34.278a4.228,4.228,0,1,0-7.828,3.2l17.163,42a4.229,4.229,0,0,0,3.571,2.614c.116.01.23.014.344.014a4.232,4.232,0,0,0,3.6-2.018l10.577-17.245,20.762,4.52a4.228,4.228,0,0,0,4.814-5.729Z"
                transform="translate(-226.208 -260.014)"
              />
            </g>
          </g>
          <path
            :style="setFillColor(colorsSet.mainCircle)"
            d="M739.59,380.816,724.7,377.258l-8.7,11.73-14.761,3.031-.923,13.706L688.586,416l5.4,13.179-4.349,11.73,9.753,10.28.923,14.234,14.1,4.613,7.249,13.048,15.024-4.349s11.2,7.512,11.73,7.249,11.2-9.621,11.2-9.621l14.629.659,5.535-12.784,13.311-6.194-2.5-14.629,8.83-12.125-8.83-12.784,3.163-12.784L781.5,398.081l-5.14-13.048h-14.1L750.792,374.49Z"
            transform="translate(-684 -370)"
          />
          <g>
            <g transform="translate(0 0)">
              <path
                d="M177.966,59.227l-7.612-10.446,2.593-12.662a4.227,4.227,0,0,0-2.274-4.64l-11.594-5.711L155.49,13.35a4.181,4.181,0,0,0-4.17-3.052l-12.92.33L129.451,1.3A4.231,4.231,0,0,0,124.34.535l-11.287,6.3L100.8,2.733a4.226,4.226,0,0,0-4.881,1.7L88.848,15.253,76.088,17.318a4.231,4.231,0,0,0-3.533,3.772L71.327,33.956l-10.339,7.76A4.228,4.228,0,0,0,59.611,46.7L64.5,58.661,58.955,70.333a4.231,4.231,0,0,0,1.1,5.05L69.943,83.7l.51,12.916a4.227,4.227,0,0,0,3.317,3.962L86.4,103.352l6.457,11.2a4.225,4.225,0,0,0,4.778,1.967L110.1,113.1l10.921,6.914a4.23,4.23,0,0,0,5.147-.479l9.452-8.817,12.883,1.048a4.216,4.216,0,0,0,4.332-2.817l4.272-12.2L169,91.693a4.227,4.227,0,0,0,2.528-4.506L169.64,74.4l8.181-10.009A4.223,4.223,0,0,0,177.966,59.227ZM161.91,70.5a4.222,4.222,0,0,0-.91,3.292l1.682,11.405L152.074,89.7a4.218,4.218,0,0,0-2.335,2.493l-3.81,10.881-11.49-.936a4.233,4.233,0,0,0-3.225,1.123l-8.431,7.863-9.74-6.168a4.207,4.207,0,0,0-2.26-.657,4.033,4.033,0,0,0-1.116.155L98.548,107.5l-5.759-9.986A4.228,4.228,0,0,0,90.034,95.5l-11.26-2.472-.457-11.519a4.232,4.232,0,0,0-1.5-3.068l-8.822-7.422,4.949-10.41a4.234,4.234,0,0,0,.094-3.416l-4.364-10.67,9.221-6.92a4.228,4.228,0,0,0,1.671-2.979l1.1-11.476,11.379-1.842A4.229,4.229,0,0,0,94.9,21.444l6.3-9.654,10.932,3.658a4.233,4.233,0,0,0,3.4-.317l10.065-5.618,7.981,8.319a4.092,4.092,0,0,0,3.159,1.3l11.524-.295,3.2,11.074a4.23,4.23,0,0,0,2.194,2.618l10.341,5.094-2.314,11.294a4.234,4.234,0,0,0,.726,3.337l6.789,9.316Z"
                transform="translate(-58.546 0)"
              />
            </g>
          </g>
        </svg>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: ['medal', 'size'],
  computed: {
    colorsSet() {
      return {
        stroke: this.medal.strokeColor || '#424242',
        mainCircle: this.medal.mainCircle || '#FFFFFF',
        leftRibbon: this.medal.leftRibbon || '#FFFFFF',
        rightRibbon: this.medal.rightRibbon || '#FFFFFF',
        gradient: {
          left: this.medal.leftGradientColor || '#FFFFFF',
          center: this.medal.centerGradientColor || this.medal.color,
          right: this.medal.rightGradientColor || '#FFFFFF'
        }
      }
    },
    getFillColorStyle() {
      return `fill: ${this.colorsSet.stroke}`
    },
    getIconStrokeColor() {
      return `color: ${this.colorsSet.stroke};`
    },
    getBorderColorStyle() {
      return `border: 1px solid ${this.colorsSet.stroke};`
    },
    medalBackgroundColor() {
      const gradientCenterColor = this.colorsSet.gradient.center
      return `background: linear-gradient(135deg, #fafafa 0%, ${gradientCenterColor} 50%, #fafafa 110%);`
    },
    color() {
      return this.medal.color ? this.medal.color : '#4472E9'
    },
    medalName() {
      return this.medal.name
    },
    splittedMedalName() {
      return this.medalName.toUpperCase().split('')
    },
    anglePerChar() {
      return (14 * this.medalName.length) / this.medalName.length
    },
    angleOffset() {
      return 7 * (this.medalName.length - 1)
    }
  },
  methods: {
    setFillColor(color) {
      return `fill: ${color}`
    }
  }
}
</script>

<style lang="scss">
.medal-container {
  display: flex;
  justify-content: center;
  padding: 2px 3px;
  position: relative;
  cursor: pointer;

  .sm {
    .medal-container {
      &__award {
        width: 40px;
        height: 40px;
      }
      &__body {
        width: 20px;
        height: 19px;
        position: absolute;
        top: 7px;
        border-radius: 50px;
        margin: auto;

        display: flex;
        justify-content: center;
        align-items: center;

        .inside-circle-line {
          width: 10px;
          height: 10px;
          border-radius: 50px;
          background-color: transparent;
          position: relative;
          margin-top: -1px;
          margin-left: 1px;

          img {
            height: 80px;
            width: 80px;
          }

          i {
            font-size: 5px;
            position: absolute;
            top: 1.6px;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
      }
    }
  }
  .lg {
    .medal-container {
      &__award {
        width: 100px;
        height: 100px;
      }
      &__body {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 14px;
        border-radius: 50px;
        margin: auto;

        display: flex;
        justify-content: center;
        align-items: center;

        .medal-title {
          position: relative;
          display: inline-block;
          margin: 0 auto;

          span {
            font: 9px Monaco, MonoSpace;
            height: 25px;
            position: absolute;
            width: 8px;
            left: 11px;
            top: -25px;
            transform-origin: bottom center;
            color: #424242;
            font-weight: 700;
          }
        }

        .inside-circle-line {
          width: 30px;
          height: 30px;
          border-radius: 50px;
          position: relative;
          left: -9px;
          background-color: transparent;

          img {
            width: 30px;
          }

          i {
            font-size: 20px;
            position: absolute;
            top: 6px;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
