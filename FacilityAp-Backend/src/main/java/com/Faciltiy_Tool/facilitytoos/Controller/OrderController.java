package com.Faciltiy_Tool.facilitytoos.Controller;


import com.Faciltiy_Tool.facilitytoos.Repository.OrderRepository;
import com.Faciltiy_Tool.facilitytoos.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api")
public class OrderController {

    private final OrderRepository repository;
    @Autowired
    public OrderController(OrderRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Functie om alle taken in de mongo database op te halen
     */
    @GetMapping("/orders")
    public List<Order> getOrders() {
        return repository.findAll();
    }

    /**
     * dit function word gebruikt om employee toewijzen aan een order
     * @param body dit komt van de frontend als json met requesterId aen orderId en employee username en id waartoe willen we het order toewijzen
     * @return HttpStatus.ok als de de order toegewijzen is aan employee, anders gaat HttpStatus.BAD_REQUEST returneren.
     */
    @PostMapping("order/assignEmployee")
    public Order assignOrderToEmployee(@RequestBody AssignOrder body) {
        try {
            Order order = repository.findOneById(body.getRequestId());
            order.setRequesterId(body.getRequesterId());
            User user = new User(body.getAssignTo().getId(), body.getAssignTo().getName());
            order.setAssignTo(user);
            repository.save(order);
            return order;

        } catch (Exception e) {
            return null;
        }


    }

    /**
     * deze function wordt gebruikt wanneer iemand op create task button klikt in de frontend
     *
     *
     * @param orderForm deze order wordt van de frontend als json file gestuurd
     * @return null
     */
    @PostMapping("/order")
    public Order saveOrder(@RequestParam(value = "order") String orderForm) {
        try {
            User user = new User(null,null);
            ExternalFirms firm = new ExternalFirms(null, null, null, null);
            Order dto = objectMapper.readValue(orderForm, Order.class);
            dto.setAssignTo(user);
            dto.setAssignToFirm(firm);

            Order orderAd = new Order(dto.getRequesterId(), dto.getRequesterName(),dto.getTitle(),dto.getCampus(),dto.getFloor(),dto.getLocation(),
                    dto.isCloseTo(), dto.getDescription(),dto.getDate(),dto.getTime(), dto.getCategoryDepartment(), dto.getCategory(),dto.getStatus(),dto.getAssignTo(), dto.getAssignToFirm());
            repository.save(orderAd);
            return orderAd;

        } catch (Exception e) {
            return null;

        }

    }

    /**
     * Functie om een order in de mongo database op basis van het id op te halen
     */
    @GetMapping("/order/{id}")
    public Optional<Order> getOrdersById(@PathVariable String id) {
        return repository.findById(id);
    }

    /**
     * Functie om een order in de mongo database op basis van het id te verwijderen
     */
    @DeleteMapping("order/delete/{id}")
    public Boolean deleteOrder(@PathVariable String id) {
        if(id == null){
            return false;
        } else {
            repository.deleteById(id);
            return true;
        }
    }




    /**
     * Functie om een order in de mongo database op basis van de locatie op te halen
     */
    @GetMapping("orders/findByLocation/{location}")
    public List<Order> getOrdersByLocation(@PathVariable String location) {
        return repository.findByLocation(location);
    }
    /**
     * Functie om een order in de mongo database op basis van de orderedId op te halen
     */
    @GetMapping("/byRequesterId/{requesterId}")
    public List<Order> getByRequesterId(@PathVariable String requesterId) {
        return repository.findByRequesterId(requesterId);
    }


    /**
     * Functie om een order die toegewijzen aan de ingelogde gebruker (volgens zijn role)
     *
     */
    @GetMapping("orders/assignToId/{userId}")
    public List<Order> getMyOrders(@PathVariable String userId) {
        return repository.getByAssignToId(userId);
    }


    /**
     * deze function wordt aangeroepen wanneer iemand een task wil updaten in de frontend
     *
     *
     * @param updateForm deze order wordt van de frontend als json file gestuurd
     * @return HttpStatus.ok als de defect juist gecareerd anders return BAD_REQUEST
     */
    @PutMapping("/order/{id}")
    public Order updateOrder(@PathVariable String id, @RequestParam(value = "order") String updateForm) {
        Optional<Order> optionalOrder = repository.findById(id);
        Order order;


        if (optionalOrder.isPresent()) {
            order = optionalOrder.get();
        } else {
            return null;
        }

        try {
            Order dto = objectMapper.readValue(updateForm, Order.class);

            // Indien een attribuut verschilt met het origineel object, update de attribuut
            if (!dto.getTitle().equals(order.getTitle())) {
                order.setTitle(dto.getTitle());
            }
            if (!dto.getDescription().equals(order.getDescription())) {
                order.setDescription(dto.getDescription());
            }
            if (!dto.getLocation().equals(order.getLocation())) {
                order.setLocation(dto.getLocation());
            }
            if (dto.isCloseTo() != order.isCloseTo()) {
                order.setCloseTo(!order.isCloseTo());
            }
            if (!dto.getFloor().equals(order.getFloor())) {
                order.setFloor(dto.getFloor());
            }
            if (!dto.getCampus().equals(order.getCampus())) {
                order.setCampus(dto.getCampus());
            }
            if (!dto.getStatus().equals(order.getStatus())) {
                order.setStatus(dto.getStatus());
                order.getStatusHistory().add(dto.getStatus());
            }
            if (!dto.getDate().equals(order.getDate())) {
                order.setDate(dto.getDate());
            }
            if (!dto.getTime().equals(order.getTime())) {
                order.setTime(dto.getTime());
            }
            if (!dto.getCategory().equals(order.getCategory())) {
                order.setCategory(dto.getCategory());
            }
            if (!dto.getCategoryDepartment().equals(order.getCategoryDepartment())) {
                order.setCategoryDepartment(dto.getCategoryDepartment());
            }

            // Push de wijzigingen naar de database
            repository.save(order);

            return order;
        } catch (Exception ex) {
            return null;
        }
    }


    /**
     * Functie om een order in de mongo database op basis van de categorie op te halen
     */
    @GetMapping("orders/byCategory/{category}")
    public List<Order> getOrdersByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }


    /**
     * dit function word gebruikt om employee toewijzen aan een order
     *
     * @param body dit komt van de frontend als json met requesterId aen requestId en employee username en id waartoe willen we het het order toewijzen
     * @return HttpStatus.ok als de de order toegewijzen is aan employee, anders gaat HttpStatus.BAD_REQUEST returneren.
     */
    @PostMapping("order/assignFirm")
    public Order assignOrderToFirm(@RequestBody AssignOrder body) {
        try {
            Order order = repository.findOneById(body.getRequestId());
            order.setRequesterId(body.getRequesterId());
            ExternalFirms firm = new ExternalFirms(body.getAssignToFirm().getEmail(), body.getAssignToFirm().getDisplayName(), body.getAssignToFirm().getTelefonNr(),body.getAssignToFirm().getRole());
            order.setAssignToFirm(firm);
            repository.save(order);
            return order;
        } catch (Exception e) {
            return null;
        }

    }


}
