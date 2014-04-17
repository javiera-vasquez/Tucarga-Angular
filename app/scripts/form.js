    $(document).foundation();
    $(document).ready(function() {
        // select the corret type
        // Cargo datepicker
        $('.datepicker-input').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          language: "es",
        });
        // Show input almacenaje
        $('#si_almacenaje').on("click", function(){
          $('.show_amalcenaje').removeClass('none');
          $('.show_amalcenaje').addClass('show');
        });
        $('#no_almacenaje').on("click", function(){
          $('.show_amalcenaje').removeClass('show');
          $('.show_amalcenaje').addClass('none');
        });
        // if/else de numero de cargas
        var i = 2;
        $(".add-new-carga").click(function () {
            if (i <= 3) {
                $('.carga-box'+ (i++)).show();
                console.log(i);
                if (i == 4) {
                    $(".add-new-carga").remove();
                    console.log(i);
                }
            }
        });
    });
