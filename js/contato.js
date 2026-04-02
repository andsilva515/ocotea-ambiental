(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const messageEl = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  const ENDPOINT = "https://api.ocoteaambiental.com.br/contato.php";

  function setMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = "form-message";
    if (type) messageEl.classList.add(type);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const payload = {
      nome: String(formData.get("nome") || "").trim(),
      telefone: String(formData.get("telefone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      assunto: String(formData.get("assunto") || "").trim(),
      mensagem: String(formData.get("mensagem") || "").trim()
    };

    if (!payload.nome || !payload.email || !payload.assunto || !payload.mensagem) {
      setMessage("Preencha os campos obrigatórios.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    setMessage("", "");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Não foi possível enviar sua mensagem.");
      }

      form.reset();
      setMessage("Mensagem enviada com sucesso. Em breve entraremos em contato.", "success");
    } catch (error) {
      setMessage(error.message || "Erro ao enviar mensagem. Tente novamente.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensagem";
    }
  });
})();
