/**
 * Formspree contact form — same pattern as phlipotracing.com:
 * POST via fetch + FormData, Accept: application/json, inline success/error UI.
 */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMsg = document.getElementById("success-message");
  const errorMsg = document.getElementById("error-message");
  const formFields = document.getElementById("form-fields");
  const submitBtn = document.getElementById("submit-btn");
  const defaultBtnText = submitBtn ? submitBtn.textContent : "Send Message";

  const endpoint = form.getAttribute("action") || "";
  const needsSetup =
    !endpoint ||
    endpoint.includes("YOUR_FORMSPREE_ID") ||
    !endpoint.startsWith("https://formspree.io/f/");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (needsSetup) {
      if (errorMsg) {
        errorMsg.textContent =
          "Form delivery is not configured yet. Please call (513) 375-1769 or email greg@gregsauerlawyers.com.";
        errorMsg.classList.remove("hidden");
      }
      return;
    }

    if (submitBtn) {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
    }
    if (errorMsg) errorMsg.classList.add("hidden");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        if (successMsg) successMsg.classList.remove("hidden");
        if (formFields) formFields.classList.add("hidden");
        form.reset();
      } else {
        const data = await response.json().catch(function () {
          return {};
        });
        throw new Error(
          (data.errors && data.errors.map(function (err) {
            return err.message;
          }).join(" ")) || "Submission failed"
        );
      }
    } catch (err) {
      if (errorMsg) {
        errorMsg.textContent =
          err.message ||
          "Something went wrong. Please try again or call (513) 375-1769.";
        errorMsg.classList.remove("hidden");
      }
    } finally {
      if (submitBtn) {
        submitBtn.textContent = defaultBtnText;
        submitBtn.disabled = false;
      }
    }
  });
})();
