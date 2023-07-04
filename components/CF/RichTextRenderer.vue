<template>
  <render />
</template>

<script lang="ts" setup>
const props = defineProps<{
  content: any[];
  font?: ContentfulRichTextFont;
}>();

const parseText = (marks: any, value: string) => {
  if (value === "") return h("br");
  if (marks.length > 0) {
    let classStringArray: string[] = [];
    marks.forEach((mark: any) => {
      if (mark.type === "bold") {
        classStringArray.push("font-bold");
      }
      if (mark.type === "italic") {
        classStringArray.push("italic");
      }
    });
    return h("span", { class: classStringArray.join(" ") }, value);
  }
  return value;
};

const parseParagraph = (items: any) => {
  return items.map(({ nodeType, value, marks, data, content }: any) => {
    switch (nodeType) {
      case "text":
        return parseText(marks, value);
      case "hyperlink":
        return h(
          "a",
          { class: "underline", href: data.uri },
          parseText(content[0].marks, content[0].value)
        );
      default:
        return parseText(marks, value);
    }
  });
};

const render = () => {
  let arr = props.content.map((item: any) => {
    switch (item.nodeType) {
      case "paragraph":
        return h("p", { class: parseFont(props.font) }, parseParagraph(item.content));
      case "heading-1":
        return h("h1", parseParagraph(item.content));
      case "heading-2":
        return h("h2", parseParagraph(item.content));
      case "heading-3":
        return h("h3", parseParagraph(item.content));
      case "heading-4":
        return h("h4", parseParagraph(item.content));
      case "heading-5":
        return h("h5", parseParagraph(item.content));
      case "heading-6":
        return h("h6", parseParagraph(item.content));
      case "embedded-asset-block":
        return h("img", {
          src: item.data.target.fields.file.url,
          alt: item.data.target.fields.description,
        });
      default:
        return h("p", "default");
    }
  });

  return h("div", arr);
};

const parseFont = (mode: ContentfulRichTextFont | undefined) => {
  switch (mode) {
    case "OpenSans":
      return "open-sans";
    default:
      return "";
  }
};
</script>

<style>
.open-sans {
  font-family: "OpenSans";
  hyphens: auto;
}
</style>
