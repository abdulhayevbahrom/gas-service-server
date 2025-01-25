class response {
  success(res, message = "amal muvaffaqiyatli amalga oshirildi", data = null) {
    return res.status(200).send({
      success: true,
      message,
      innerData: data,
    });
  }

  error(res, message = "xatolik", data = null) {
    return res.status(400).send({
      success: false,
      message,
      innerData: data,
    });
  }

  notFound(res) {
    return res.status(404).send({
      success: false,
      message: "Malumot topilmadi",
      innerData: null,
    });
  }

  // server error
  serverError(res, message = "Server xatoligi", data = null) {
    return res.status(500).send({
      success: false,
      message,
      innerData: data,
    });
  }
}

module.exports = new response();
