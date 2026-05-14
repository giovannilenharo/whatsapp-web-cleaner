const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");

clearBtn.addEventListener("click", async () => {
  if (!chrome.browsingData) {
    statusEl.textContent = "API browsingData não disponível.";
    statusEl.style.color = "red";
    return;
  }

  clearBtn.disabled = true;
  statusEl.style.color = "";
  statusEl.textContent = "Limpando...";

  try {
    await chrome.browsingData.remove(
      {
        origins: ["https://web.whatsapp.com"]
      },
      {
        cache: true,
        cookies: true,
        localStorage: true,
        indexedDB: true,
        serviceWorkers: true,
        cacheStorage: true
      }
    );

    statusEl.textContent = "Dados removidos com sucesso.";
    statusEl.style.color = "green";
  } catch (error) {
    statusEl.textContent = "Erro ao limpar: " + (error?.message || "erro desconhecido");
    statusEl.style.color = "red";
  } finally {
    clearBtn.disabled = false;
  }
});
