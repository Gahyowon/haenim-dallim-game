
let currentScene = "scene1";

async function loadStory() {
  const res = await fetch("story.json");
  return await res.json();
}

function renderScene(story, chapter, sceneId) {
  const scene = story[chapter][sceneId];
  document.getElementById("scene").innerText = scene.text;
  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  if (scene.ending) {
    const endMsg = document.createElement("p");
    endMsg.textContent = "🌙 " + scene.ending;
    choices.appendChild(endMsg);
    return;
  }

  for (const key of Object.keys(scene)) {
    if (key.startsWith("q")) {
      const btn = document.createElement("button");
      btn.textContent = scene[key];
      btn.onclick = () => {
        const nextScene = scene.next?.[key];
        if (nextScene) {
          renderScene(story, chapter, nextScene);
        } else {
          alert("다음 장면이 아직 연결되지 않았습니다.");
        }
      };
      choices.appendChild(btn);
    }
  }
}

loadStory().then(story => {
  renderScene(story, "chapter1", currentScene);
});
