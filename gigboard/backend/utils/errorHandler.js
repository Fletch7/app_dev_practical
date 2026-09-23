const errorHandler = (res, err) => {
    console.error(err);
    return res.status(500).json({ message: "Something broke" });
};

export default errorHandler;

// This handles uniform error handling across whole database