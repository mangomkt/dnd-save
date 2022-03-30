<template>
  <section>
    <div class="row">
      <button @click="save">Save</button>
    </div>
    <div class="row">
      <div class="sidebar">
        <h3>Items</h3>
        <draggable
          class="dragArea list-group"
          :list="modules"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneItem"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in modules"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
        <rawDisplayer class="col-3" :value="pagecontent" title="Content JSON" />
      </div>

      <div class="content">
        <h3>Content</h3>
        <draggable
          class="dragArea list-group"
          :list="pagecontent"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="(element, idx) in pagecontent"
            :key="idx"
          >
            <div class="card-title">{{ element.name }}</div>
            <input type="text" v-if="element.type === 'title'" v-model="element.text" />
            <textarea v-if="element.type === 'textarea'" v-model="element.text" ></textarea>
            <select v-if="element.type === 'iconcard'" v-model="element.cols">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div class="icon-wrap" :class="'col-' + [element.cols]">
              <div
                class="icon-items"
                v-for="(it, cidx) in element.items"
                :key="cidx"
              > 
                <div class="icon-items-inner">
                  <label>Font Awesome Class</label>
                  <input type="text" v-model="it.icon" />
                  <label>Descriptive Text</label>
                  <textarea type="text" v-model="it.text" ></textarea>
                  <i class="fa fa-times item-del" @click="removeChildAt(idx,cidx)"></i>
                </div>
              </div>
            </div>
            <button v-if="element.items" class="" @click="add(idx)" >Add</button>
            <i class="fa fa-times item-del" @click="removeAt(idx)"></i>
          </div>
        </draggable>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      modules: [
        { name: "Title", type: "title" },
        { name: "Textarea", type: "textarea" },
        { name: "Icon Card", type: "iconcard" }
      ],
      pagecontent: []
    };
  },
  created() {
    let content = window.localStorage.getItem('content');
    if (content === null || content.length === 0) {
      localStorage.content = JSON.stringify([])
    } else {
      this.pagecontent = JSON.parse(localStorage.content)
    }
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    removeAt: function(idx) {
      this.pagecontent.splice(idx, 1);
    },
    removeChildAt: function(idx, cidx) {
      this.pagecontent[idx].items.splice(cidx, 1);
    },
    add: function(idx) {
      this.pagecontent[idx].items.push({icon: "fa", text: "foo"});
    },
    cloneItem({name, type }) {

      if(type === "iconcard") {
        return {
          name: `${name}`,
          type: `${type}`,
          cols: "3",
          items: [
            {icon: "fa fa-link", text: "foo bar"}
          ]
        };
      } else {
        return {
          name: `${name}`,
          type: `${type}`,
        };
      }
    },
    save: function() {
      localStorage.content = JSON.stringify(this.pagecontent);
    },
  }
};
</script>