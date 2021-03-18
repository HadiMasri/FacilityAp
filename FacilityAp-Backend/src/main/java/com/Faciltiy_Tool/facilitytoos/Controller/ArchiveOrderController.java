package com.Faciltiy_Tool.facilitytoos.Controller;
import com.Faciltiy_Tool.facilitytoos.Repository.ArchiveOrdersRepository;
import com.Faciltiy_Tool.facilitytoos.model.ArchiveOrders;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ArchiveOrderController {
    private final ArchiveOrdersRepository archiveOrdersRepository;

    public ArchiveOrderController(ArchiveOrdersRepository archiveOrdersRepository) {
        this.archiveOrdersRepository = archiveOrdersRepository;
    }

    /**
     *
     * @param orderToArchive object van ArchiveReport
     * @return  Http status ok als het geslaagd anders returneert Bad request
     */
    @PostMapping("/orderToArchive")
    public ArchiveOrders addOrderToArchive(@RequestBody ArchiveOrders orderToArchive){
        try {
            archiveOrdersRepository.save(orderToArchive);
            return orderToArchive;
        } catch (Exception ex){
            return null;
        }

    }

    /**
     *
     * @return lijst van orders van ArchiveReports collection
     */
    @GetMapping("/ordersFromArchive")
    public List<ArchiveOrders> getAllOrdersFromArchive(){
        return archiveOrdersRepository.findAll();
    }


}
