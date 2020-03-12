<template>
  <b-card
    no-body
    class="wrapper"
  >
    <div :style="perspective" class="wrapper__inner">
      <span :style="`transform: ${scale} ${rotateX} ${rotateY} ${rotateZ};`" class="o wrapper__text">
        O
      </span>
      <span :style="`transform: ${scale} ${rotateX} ${rotateY} ${rotateZ}`" class="p wrapper__text">
        P
      </span>
      <span :style="`transform: ${scale} ${rotateX} ${rotateY} ${rotateZ}`" class="e wrapper__text">
        E
      </span>
      <span :style="`transform: ${scale} ${rotateX} ${rotateY} ${rotateZ}`" class="x wrapper__text">
        X
      </span>
    </div>
    <div class="wrapper__controls">
      <div
        v-for="(input, i) in inputs"
        :key="input.selector"
        class="wrapper__controls__control"
      >
        <label :for="input.selector">
          {{ i }} {{ input.selector }} {{ input.value }}
        </label>
        <div class="control-group">
          <span class="control-group__btn">
            {{ input.min }}
          </span>
          <input
            :name="input.selector"
            v-model="input.value"
            :min="input.min"
            :max="input.max"
            list="tickmarks"
            type="range"
            class="input"
          />
          <datalist v-if="input.selector === 'perspective'" id="tickmarks">
            <option value="0"></option>
            <option value="500"></option>
            <option value="1000"></option>
            <option value="1500"></option>
            <option value="2000"></option>
          </datalist>
          <span class="control-group__btn">
            {{ input.max }}
          </span>
          <button @click="onReset(i)" class="btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          selector: 'perspective',
          value: '1200',
          min: '0',
          max: '2000',
          default: '1200'
        },
        {
          selector: 'scale',
          value: '1',
          min: '0.1',
          max: '5',
          default: '1'
        },
        {
          selector: 'rotateX',
          value: '0',
          min: '-180',
          max: '180',
          default: '0'
        },
        {
          selector: 'rotateY',
          value: '0',
          min: '-180',
          max: '180',
          default: '0'
        },
        {
          selector: 'rotateZ',
          value: '0',
          min: '-180',
          max: '180',
          default: '0'
        }
      ]
    }
  },
  computed: {
    perspective () {
      return `perspective: ${this.inputs[0].value}px;`
    },
    scale () {
      return `scale(${this.inputs[1].value})`
    },
    rotateX () {
      return `rotateX(${this.inputs[2].value}deg)`
    },
    rotateY () {
      return `rotateY(${this.inputs[3].value}deg)`
    },
    rotateZ () {
      return `rotateZ(${this.inputs[4].value}deg)`
    }
  },
  methods: {
    onReset (i) {
      this.inputs[i].value = 0
    }
  }
}
</script>

<style lang="scss" scoped>
$red: #fb001e;
$darkblue: #2f38b0;
$blue: #5277c2;
$yellow: #ffaf00;
$pink: #ff00c4;
$darkpink: #970274;
$grey: #121926;
$lightgrey: #858585;

.wrapper {
  position: absolute;
  height: 500px;
  width: 500px;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  transform-style: preserve-3d;
  // perspective: 1200px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  // background-color: $grey;
  z-index: -1;
  &__inner {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 25px solid $blue;
    z-index: 3;
    overflow: hidden;
  }
  &__text {
    position: absolute;
    font-size: 15em;
    font-weight: 900;
    z-index: 2;
    transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  &__controls {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    // padding: 0.25em 1em;
    width: 100%;
    &__control {
      // border: 1px solid $pink;
      & label {
        display: block;
        padding: 0.5em 0;
        text-transform: uppercase;
        font-size: 0.8em;
        color: $pink;
        text-align: center;
        // border: 1px solid $blue;
      }
    }
  }
}
.input {
  width: 100%;
}
.control-group {
  display: flex;
  &__btn {
    padding: 0.5em 1.5em;
    text-align: center;
    border: 1px solid $pink;
    background-color: $pink;
    color: white;
    &:first-of-type {
      border-radius: 10px 0 0 10px;
    }
  }
  & .input {
    flex: 1 1 auto;
    padding: 0 0.5em;
  }
}
.btn {
  border: none;
  background: none;
  outline: none;
  background-color: $darkpink;
  color: white;
  padding: 0.5em 1.5em;
  border-radius: 0 10px 10px 0;
}
.o {
  top: 5px;
  left: 5px;
  color: $pink;
  text-shadow: -15px 5px 0 $darkblue;
}
.p {
  top: 5px;
  right: 5px;
  color: $yellow;
  text-shadow: 15px 5px 0 $red;
}
.e {
  bottom: 5px;
  left: 5px;
  color: $red;
  text-shadow: 5px -5px 0 $grey, 10px -10px 0 $grey;
}
.x {
  bottom: 25px;
  right: 25px;
  color: $darkblue;
}
</style>
