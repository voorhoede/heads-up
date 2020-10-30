<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style>
.loader-container {
  display: grid;
  align-content: center;
  height: 100%;
}

.loader {
  width: 30px;
  height: 30px;
  position: relative;
  margin: auto;
}

.loader::before, .loader::after {
  content: '';
  position: absolute;
}

.loader-list {
  display: grid;
  grid-template: repeat(3, 120px) / repeat(3, 120px);
  grid-gap: 30px;
}

.loader-item {
  display: flex;
  background: rgba(0, 0, 0, 0.05);
}

.loader {
  border: 1px solid blue;
  height: 14px;
  width: 32px;
}

.loader::before {
  width: 4px;
  height: 10px;
  background-color: blue;
  left: 1px;
  top: calc(50% - 5px);
  animation: blockBar 2s infinite;
}

@keyframes blockBar {
	0%, 80% {
    opacity: 1;
  }
	0%, 20% {
		box-shadow: 8px 0 0 0 rgba(255, 255, 255, 0), 16px 0 0 0 rgba(255, 255, 255, 0), 24px 0 0 0 rgba(255, 255, 255, 0)
  }
  21%, 40% {
		box-shadow: 8px 0 0 0 blue, 16px 0 0 0 rgba(255, 255, 255, 0), 24px 0 0 0 rgba(255, 255, 255, 0)
	}
  41%, 60% {
		box-shadow: 8px 0 0 0 blue, 16px 0 0 0 blue, 24px 0 0 0 rgba(255, 255, 255, 0)
	}
  61%, 80% {
		box-shadow: 8px 0 0 0 blue, 16px 0 0 0 blue, 24px 0 0 0 blue
	}
  81%, 100% {
    opacity: 0
  }
}
</style>
