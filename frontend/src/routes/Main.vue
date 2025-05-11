<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { OnFileDrop, ResolveFilePaths } from "../../wailsjs/runtime/runtime";

const router = useRouter();

const gotoAbout = () => router.push("/about");

const onDragOver = (evt: DragEvent) => {
  if (!evt.dataTransfer) return;
  evt.dataTransfer.dropEffect = "copy";
};

const dropFiles = ref(new Array<string>());

OnFileDrop((x, y, files) => {
  console.log("OnFileDrop", files);
  dropFiles.value.push(...files);
}, true);
</script>

<template>
  <div>
    实际上这篇分享的内容没有太多看起来非常硬核的技术手段，更多的是对当前性能瓶颈的测量，以及更聪明的「重新排列组合」，或者说采用了一系列使体验更好的策略，这对用户体验的提升是巨大的。这也给了
    KAITIAN 很大的启发，基于这些，我们也重新审视并优化了 KAITIAN 的启动速度，使
    KAITIAN
    的启动由之前的接近3秒达到了500ms以内的速度，后面会分享一下基于这个分享的
    KAITIAN 启动速度优化过程。
  </div>
  <button class="main__btn" @click="gotoAbout">about</button>
  <div class="main__hor"></div>

  <div class="main__hor"></div>

  <div
    class="main__drop-area wails-drop-target-active"
    @dragover.prevent.stop="onDragOver"
  >
    drop in
  </div>
  <div>
    <div>drop files:</div>
    <div v-for="f in dropFiles">{{ f }}</div>
  </div>
</template>

<style lang="css">
.main__btn {
  margin: 20px 10px;
  appearance: none;
  outline: none;
  border: none;
  width: 100px;
  padding: 6px 24px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.main__input {
  appearance: none;
  outline: none;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.main__hor {
  display: flex;
  align-items: center;
}

.main__drop-area {
  width: 200px;
  min-height: 160px;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  --wails-drop-target: drop;
}
</style>
