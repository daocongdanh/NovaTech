package nova.tech.com.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
public class SuccessResponse {
    private final int status;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public SuccessResponse(String message, HttpStatus httpStatus, Object data) {
        this.message = message;
        this.status = httpStatus.value();
        this.data = data;
    }
}