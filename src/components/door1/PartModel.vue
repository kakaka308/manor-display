<script setup>
import { onMounted } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { setupModel } from '@/components/setupModel'

const props = defineProps({
  modelPath: { type: String, required: true },
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  rotation: { type: Array, default: () => [0, 0, 0] },
  onLoaded: Function,
})

let mesh = null

onMounted(async () => {
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync(props.modelPath)
  mesh = setupModel(gltf)
  mesh.position.set(...props.position)
  mesh.scale.set(...props.scale)
  mesh.rotation.set(...props.rotation)
  if (props.onLoaded) {
    props.onLoaded(mesh)
  }
})
console.log('setupModel返回:', mesh)
</script>
