/**
 * Contact form overlay and mail-client handoff for the portfolio index.
 */

(() => {
  "use strict";

  const recipient = "andreis2639@outlook.com";
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const nameCharacterPattern = /[\p{L}\p{M} ]/u;
  const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("contact-form-overlay");
    const dialog = document.getElementById("contact-form-dialog");
    const form = document.getElementById("contact-request-form");
    const closeButton = document.getElementById("close-contact-form");
    const sendButton = document.getElementById("send-contact-message");
    const nameInput = document.getElementById("contact-name");
    const phoneInput = document.getElementById("contact-phone");
    const mailInput = document.getElementById("contact-mail");
    const companyInput = document.getElementById("contact-company");
    const topicInput = document.getElementById("contact-topic");
    const messageInput = document.getElementById("contact-message");
    const messageCount = document.getElementById("contact-message-count");
    const triggers = Array.from(document.querySelectorAll("[data-open-contact-form]"));

    if (!overlay || !dialog || !form || !closeButton || !sendButton
      || !nameInput || !phoneInput || !mailInput || !companyInput
      || !topicInput || !messageInput || !messageCount || triggers.length === 0) return;

    let activeTrigger = null;
    let closing = false;

    function cancelAnimations() {
      [overlay, dialog].forEach(element => {
        element.getAnimations?.().forEach(animation => animation.cancel());
      });
    }

    function expansionTransform(origin) {
      if (!origin?.isConnected) return "scale(0.92)";

      const dialogBounds = dialog.getBoundingClientRect();
      const originBounds = origin.getBoundingClientRect();
      const translateX = (originBounds.left + (originBounds.width / 2))
        - (dialogBounds.left + (dialogBounds.width / 2));
      const translateY = (originBounds.top + (originBounds.height / 2))
        - (dialogBounds.top + (dialogBounds.height / 2));
      const scaleX = Math.max(0.05, originBounds.width / dialogBounds.width);
      const scaleY = Math.max(0.05, originBounds.height / dialogBounds.height);

      return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    }

    function sanitizeName() {
      const sanitized = Array.from(nameInput.value)
        .filter(character => nameCharacterPattern.test(character))
        .join("");

      if (sanitized !== nameInput.value) nameInput.value = sanitized;
    }

    function sanitizePhone() {
      const sanitized = phoneInput.value.replace(/\D/g, "");
      if (sanitized !== phoneInput.value) phoneInput.value = sanitized;
    }

    function updateValidation() {
      const name = nameInput.value.trim();
      const mail = mailInput.value.trim();
      const topic = topicInput.value.trim();
      const message = messageInput.value.trim();
      const validName = Boolean(name)
        && Array.from(name).every(character => nameCharacterPattern.test(character));

      nameInput.setCustomValidity(validName ? "" : "Enter your name using letters and spaces only.");
      mailInput.setCustomValidity(!mail || mailPattern.test(mail) ? "" : "Enter a valid email address.");
      topicInput.setCustomValidity(topic ? "" : "Enter a topic.");

      if (!message) {
        messageInput.setCustomValidity("Enter a message.");
      } else if (message.length < 20) {
        messageInput.setCustomValidity("The message must contain at least 20 characters.");
      } else {
        messageInput.setCustomValidity("");
      }

      messageCount.textContent = `${messageInput.value.length} / 500 characters`;
      sendButton.disabled = !form.checkValidity();
    }

    function openContactForm(trigger) {
      cancelAnimations();
      activeTrigger = trigger;
      closing = false;
      document.body.classList.add("contact-form-open");
      overlay.classList.remove("hidden");
      overlay.setAttribute("aria-hidden", "false");
      sanitizeName();
      sanitizePhone();
      updateValidation();

      window.requestAnimationFrame(() => {
        nameInput.focus({ preventScroll: true });

        if (motionQuery.matches || typeof dialog.animate !== "function") return;

        overlay.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 260, easing: "ease-out" }
        );
        dialog.animate(
          [
            { transform: expansionTransform(trigger), opacity: 0.55 },
            { transform: "translate(0, 0) scale(1, 1)", opacity: 1 }
          ],
          { duration: 360, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
        );
      });
    }

    async function closeContactForm(animate = true) {
      if (closing || overlay.classList.contains("hidden")) return;

      closing = true;
      cancelAnimations();

      if (animate && !motionQuery.matches && typeof dialog.animate === "function") {
        const overlayAnimation = overlay.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 280, easing: "ease-in" }
        );
        const dialogAnimation = dialog.animate(
          [
            { transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
            { transform: expansionTransform(activeTrigger), opacity: 0.4 }
          ],
          { duration: 280, easing: "cubic-bezier(0.4, 0, 1, 1)" }
        );

        await Promise.all([
          overlayAnimation.finished.catch(() => undefined),
          dialogAnimation.finished.catch(() => undefined)
        ]);
      }

      overlay.classList.add("hidden");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("contact-form-open");
      cancelAnimations();
      activeTrigger?.focus({ preventScroll: true });
      activeTrigger = null;
      closing = false;
    }

    function trapDialogFocus(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeContactForm();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(dialog.querySelectorAll(
        "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"
      ));

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    triggers.forEach(trigger => {
      trigger.addEventListener("click", event => {
        event.preventDefault();
        openContactForm(trigger);
      });
    });

    nameInput.addEventListener("input", () => {
      sanitizeName();
      updateValidation();
    });
    nameInput.addEventListener("change", updateValidation);

    phoneInput.addEventListener("input", () => {
      sanitizePhone();
      updateValidation();
    });
    phoneInput.addEventListener("change", updateValidation);

    [mailInput, companyInput, topicInput, messageInput].forEach(field => {
      field.addEventListener("input", updateValidation);
      field.addEventListener("change", updateValidation);
    });

    closeButton.addEventListener("click", () => closeContactForm());
    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeContactForm();
    });
    document.addEventListener("keydown", event => {
      if (!overlay.classList.contains("hidden")) trapDialogFocus(event);
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      sanitizeName();
      sanitizePhone();
      updateValidation();

      if (!form.reportValidity()) return;

      const subject = `WebRequest: ${topicInput.value.trim()}`;
      const body = [
        `Name: ${nameInput.value.trim()}`,
        `Mail: ${mailInput.value.trim()}`,
        `Phone: ${phoneInput.value.trim()}`,
        `Company: ${companyInput.value.trim()}`,
        "",
        "Message:",
        messageInput.value.trim()
      ].join("\n");
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      closeContactForm(false);
      window.location.href = mailtoUrl;
    });

    updateValidation();
  });
})();
